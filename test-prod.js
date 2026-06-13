async function runTest() {
    const payload = {
        fullName: "Тестовый Администратор (Бот)",
        club: "cyberx-novokosino",
        score: 18,
        maxScore: 20,
        passed: true,
        mistakes: [
            {
                question: "Что делать, если клиент разлил колу на клавиатуру?",
                selectedAnswer: "Сделать вид, что ничего не было",
                correctAnswer: "Немедленно отключить клавиатуру и вытереть, сообщить старшему"
            },
            {
                question: "Сколько стоит пакет 'Ночь' в выходной день?",
                selectedAnswer: "500 рублей",
                correctAnswer: "1200 рублей"
            }
        ]
    };

    console.log("Sending test payload to production...");
    
    try {
        const response = await fetch("https://cyberx-novokosino.ru/api/admin-test", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", data);
    } catch (e) {
        console.error("Error:", e);
    }
}

runTest();
