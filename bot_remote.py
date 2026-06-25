import os
import json
import urllib.request
from telegram import Bot
from apscheduler.schedulers.blocking import BlockingScheduler
from dotenv import load_dotenv

# Загружаем переменные окружения из файла .env
load_dotenv('/root/uborka/.env')

BOT_TOKEN = os.environ.get('BOT_TOKEN')
if BOT_TOKEN is None:
    # Для локального тестирования можно не падать, если токен не найден, 
    # но в продакшене это критично.
    print("ВНИМАНИЕ: Не найден BOT_TOKEN в переменных окружения.")
    # raise ValueError("Не найден BOT_TOKEN. Проверьте файл .env.") 

ADMIN_ID = int(os.environ.get('ADMIN_ID', '0'))
ALTUFEVO_CHAT_ID = int(os.environ.get('ALTUFEVO_CHAT_ID', '0'))
# Если нужно отправлять в основной чат, можно задать ALTUFEVO_THREAD_ID = 0 или оставить пустым
ALTUFEVO_THREAD_ID = int(os.environ.get('ALTUFEVO_THREAD_ID', '0'))
NOVOKOSINO_CHAT_ID = int(os.environ.get('NOVOKOSINO_CHAT_ID', '0'))
NOVOKOSINO_THREAD_ID = int(os.environ.get('NOVOKOSINO_THREAD_ID', '0'))

bot = Bot(token=BOT_TOKEN) if BOT_TOKEN else None

# Общие части сообщения
BASE_MESSAGE = (
    "Включи технический свет и сделай уборку по чек листу ниже.\n\n"
    "Проверить каждое ПК место (обязательно)\n\n"
    "Протереть мышь и амбушюры наушников влажными салфетками\n\n"
    "Протереть коврик, затем повесить коврик на спинку кресла\n\n"
    "Если на столе крошки, грязь, залито и.т.д - протереть весь стол полностью, включая зону за монитором\n\n"
    "Монитор: выключить, проверить с фонариком - протирать только места со следами пальцев салфетками для мониторов\n\n"
    "Проверка игрового места: стул придвинут, наушники на крючке, на клавиатуре влажная салфетка\n\n"
    "PS5 зона (обязательно)\n\n"
    "Джойстики протирать после каждого клиента влажными салфетками\n\n"
    "Бочка на месте и чистая, лежат 2 влажные салфетки, диван чистый\n\n"
    "Автосимы (обязательно)\n\n"
    "Протереть педали (верх и боковые поверхности)\n\n"
    "Протереть руль и платформу рулевой базы\n\n"
    "Продуть зону педалей и пространство за педалями\n\n"
    "Быстрые общие точки\n\n"
    "Дверца холодильника - протереть средством для стекла\n\n"
)

CLEANER_BLOCK = (
    "Если уборщица не пришла до 12:00\n"
    "Поняли по полным мусоркам и немытому полу - сразу пишешь или звонишь.\n\n"
    "Контакты уборщиц\n\n"
    "Новокосино: +7 905 255-11-42\n\n"
    "Алтуфьево: +7 926 894-41-10\n\n"
)

FOOTER_MESSAGE = (
    "После уборки\n"
    "Выключи технический свет и поставь реакцию ✅"
)

# === ПЕРИОДИЧЕСКИЕ ПРОВЕРКИ ОБОРУДОВАНИЯ ===

REPORT_REQUIREMENT = (
    "\n\nПожалуйста, отправьте результаты проверки в этот чат, "
    "указав номера ПК или конкретное количество проблемных устройств/товаров "
    "для их точной идентификации."
)

# Еженедельная проверка еды (С учетом ротации FIFO)
PERIODIC_MESSAGE_WEEKLY = (
    "\U0001f6a8 <b>ЕЖЕНЕДЕЛЬНАЯ ПРОВЕРКА: КОНТРОЛЬ СРОКОВ И РОТАЦИЯ (FOOD-ЗОНА)</b>\n\n"
    "1️⃣ <b>ПРОВЕРКА СРОКОВ:</b>\n"
    "- <b>Сэндвичи:</b> 14 суток с даты на упаковке. Если срок истек — в утиль.\n"
    "- <b>Чиабатты:</b> 10 суток с даты изготовления. Если срок истек — в утиль.\n\n"
    "2️⃣ <b>ПРАВИЛО РОТАЦИИ (ОБЯЗАТЕЛЬНО):</b>\n"
    "- Продукты, у которых срок годности заканчивается БЛИЖЕ ВСЕГО, должны стоять ПЕРВЫМИ к покупателю.\n"
    "- Самые свежие товары убирай вглубь полки.\n\n"
    "3️⃣ <b>ДЕЙСТВИЕ ПРИ ПРОСРОЧКЕ:</b>\n"
    "- Просрочку немедленно убери с витрины и сделай фото этикетки для отчета."
    + REPORT_REQUIREMENT
)

# Проверка клавиатур и мышей (1 раз в 2 месяца)
PERIODIC_MESSAGE_2_MONTHS = (
    "\U0001f6a8 <b>ПЛАНОВАЯ ПРОВЕРКА (1 раз в 2 месяца): КЛАВИАТУРЫ И МЫШИ</b>\n\n"
    "1️⃣ <b>ПОДГОТОВКА (со стойки):</b>\n"
    "- Переведи свободные ПК в 'Технический режим' в Langame.\n"
    "- Удаленно открой на этих ПК ссылку: https://cyberx-novokosino.ru/mouse-test\n\n"
    "2️⃣ <b>ПРОВЕРКА (ножками в зале):</b>\n"
    "- <b>Клавиатуры:</b> Проверь наличие всех кейкапов. Нажми пробел и Shift — не должны залипать.\n"
    "- <b>Мыши:</b> На ПК уже открыт тест. Сделай 50 быстрых кликов ЛКМ и ПКМ. Если сайт пишет 'Double Click Detected' — пиши номер ПК."
    + REPORT_REQUIREMENT
)

# Проверка геймпадов и вентиляторов (1 раз в 3 месяца)
PERIODIC_MESSAGE_3_MONTHS = (
    "\U0001f6a8 <b>ПЛАНОВАЯ ПРОВЕРКА (1 раз в 3 месяца): ГЕЙМПАДЫ И ВЕНТИЛЯТОРЫ</b>\n\n"
    "1️⃣ <b>ГЕЙМПАДЫ:</b> На админ-ПК через gamepad-tester.com проверь стики (Axis &lt; 0.05) и ПРОЖМИ ВСЕ КНОПКИ.\n"
    "- Брак: пометить малярным скотчем, подписать проблему и в зону ремонта.\n"
    "2️⃣ <b>ВЕНТИЛЯТОРЫ:</b> Проверь вращение кулеров СЗАДИ и СПЕРЕДИ на всех ПК. Если какие то не крутятся треск или шум - пиши номер ПК."
    + REPORT_REQUIREMENT
)

# Проверка мониторов (1 раз в полгода)
PERIODIC_MESSAGE_6_MONTHS = (
    "\U0001f6a8 <b>ПЛАНОВАЯ ПРОВЕРКА (1 раз в полгода): МОНИТОРЫ</b>\n\n"
    "1️⃣ <b>ПОДГОТОВКА:</b> Включить на техрежим, на ПК открыть сайт https://monitest.ru/\n"
    "2️⃣ <b>ПРОВЕРКА:</b> На черном и белом фоне ищи битые пиксели, желтые пятна или мерцание."
    + REPORT_REQUIREMENT
)

def get_night_message():
    return (
        "🚨 ВНИМАНИЕ НОЧНОМУ АДМИНИСТРАТОРУ\n" +
        BASE_MESSAGE +
        FOOTER_MESSAGE
    )

def get_day_message():
    return (
        "🚨 ВНИМАНИЕ ДНЕВНОМУ АДМИНИСТРАТОРУ\n" +
        BASE_MESSAGE +
        CLEANER_BLOCK +
        FOOTER_MESSAGE
    )

def send_message_fallback(chat_id, thread_id, text):
    url = f"http://127.0.0.1:12556/bot{BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML"
    }
    if thread_id:
        payload["message_thread_id"] = thread_id
        
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            if response.status == 200:
                print(f"Резервное сообщение отправлено через прокси в {chat_id}")
            else:
                print(f"Ошибка прокси при отправке в {chat_id}: {response.status}")
    except Exception as e:
        print(f"Глобальная ошибка резервного канала для {chat_id}:", e)

def send_message(text):
    if not bot:
        print("Bot token not found, skipping send.")
        return

    # Отправка администратору
    try:
        bot.send_message(chat_id=ADMIN_ID, text=text, parse_mode='HTML')
        print("Сообщение отправлено администратору!")
    except Exception as e:
        print("Ошибка при отправке администратору, пробуем резервный канал:", e)
        send_message_fallback(ADMIN_ID, None, text)

    # Отправка в группы
    groups = {
        ALTUFEVO_CHAT_ID: ALTUFEVO_THREAD_ID,
        NOVOKOSINO_CHAT_ID: NOVOKOSINO_THREAD_ID,
    }
    for chat_id, thread_id in groups.items():
        try:
            if thread_id:
                bot.send_message(
                    chat_id=chat_id,
                    message_thread_id=thread_id,
                    text=text,
                    parse_mode='HTML'
                )
                print(f"Сообщение отправлено в группу {chat_id} (тема {thread_id})")
            else:
                bot.send_message(
                    chat_id=chat_id,
                    text=text,
                    parse_mode='HTML'
                )
                print(f"Сообщение отправлено в группу {chat_id} (основной чат)")
        except Exception as e:
            print(f"Ошибка при отправке в группу {chat_id}, пробуем резервный канал:", e)
            send_message_fallback(chat_id, thread_id, text)

def send_night_message():
    print("Отправка сообщения ночному администратору...")
    send_message(get_night_message())

def send_day_message():
    print("Отправка сообщения дневному администратору...")
    send_message(get_day_message())

def send_periodic_message(text):
    """Отправка периодического сообщения о проверке оборудования."""
    print(f"Отправка периодического сообщения: {text[:60]}...")
    send_message(text)



if __name__ == '__main__':
    scheduler = BlockingScheduler(timezone="Europe/Moscow")

    # === УБОРКА ===

    # НОЧНОМУ АДМИНИСТРАТОРУ: понедельник, среда, пятница, воскресенье в 07:00
    scheduler.add_job(send_night_message, 'cron', day_of_week='0,2,4,6', hour=7, minute=0)

    # ДНЕВНОМУ АДМИНИСТРАТОРУ: вторник, четверг, суббота в 10:00
    scheduler.add_job(send_day_message, 'cron', day_of_week='1,3,5', hour=10, minute=0)

    # === ПЕРИОДИЧЕСКИЕ ПРОВЕРКИ ОБОРУДОВАНИЯ (все в 11:00) ===

    # Еженедельная проверка еды: каждый понедельник в 11:00
    scheduler.add_job(
        lambda: send_periodic_message(PERIODIC_MESSAGE_WEEKLY),
        'cron', day_of_week='mon', hour=11, minute=0
    )

    # Клавиатуры + мыши: 1-е число каждые 2 месяца (Апр, Июн, Авг, Окт, Дек, Фев) в 11:00
    scheduler.add_job(
        lambda: send_periodic_message(PERIODIC_MESSAGE_2_MONTHS),
        'cron', month='2,4,6,8,10,12', day=1, hour=11, minute=0
    )

    # Геймпады + вентиляторы: 2-е число каждые 3 месяца (Апр, Июл, Окт, Янв) в 11:00
    scheduler.add_job(
        lambda: send_periodic_message(PERIODIC_MESSAGE_3_MONTHS),
        'cron', month='1,4,7,10', day=2, hour=11, minute=0
    )

    # Мониторы: 3-е число каждые 6 месяцев (Апр, Окт) в 11:00
    scheduler.add_job(
        lambda: send_periodic_message(PERIODIC_MESSAGE_6_MONTHS),
        'cron', month='4,10', day=3, hour=11, minute=0
    )


    print("Планировщик запущен.")
    print("Задачи:")
    print("- Ночной администратор: Пн, Ср, Пт, Вс в 07:00")
    print("- Дневной администратор: Вт, Чт, Сб в 10:00")
    print("- Еженедельная проверка еды: Каждый Пн в 11:00")
    print("- Клавиатуры + мыши: 1-е число (Фев, Апр, Июн, Авг, Окт, Дек) в 11:00")
    print("- Геймпады + вентиляторы: 2-е число (Янв, Апр, Июл, Окт) в 11:00")
    print("- Мониторы: 3-е число (Апр, Окт) в 11:00")
    try:
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        pass
