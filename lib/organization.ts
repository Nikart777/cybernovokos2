// Разметка клуба (InternetCafe) выводится в app/layout.tsx на каждой странице.
// Блоки страниц ссылаются на неё по @id, а не описывают клуб заново: так поисковики
// видят одну организацию, а не несколько разных по одному адресу.
export const SITE_URL = "https://cyberx-novokosino.ru";
export const ORG_ID = `${SITE_URL}/#organization`;
export const ORG_NAME = "CyberX Community";
// Знак на тёмной плашке: белые буквы логотипа не пропадают на белом фоне выдачи.
export const ORG_LOGO = `${SITE_URL}/logo-square.png`;
export const ORG_REF = { "@id": ORG_ID };
