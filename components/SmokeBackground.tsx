// Чисто-CSS антураж дыма/пара для страницы /menu.
// Стили и keyframes определены в app/menu/menu.css (импортируется в app/menu/page.tsx).
export default function SmokeBackground() {
    return (
        <div className="menu-smoke-bg" aria-hidden="true">
            <div className="menu-smoke-blob menu-smoke-blob--1" />
            <div className="menu-smoke-blob menu-smoke-blob--2" />
            <div className="menu-smoke-blob menu-smoke-blob--3" />
            <div className="menu-smoke-blob menu-smoke-blob--4" />
            <div className="menu-smoke-blob menu-smoke-blob--5" />
            <div className="menu-smoke-blob menu-smoke-blob--6" />
        </div>
    );
}
