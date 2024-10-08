// App.js
import React, { useEffect } from 'react';
import { startNextLetter } from './log';
import './App.css';

function App() {
    useEffect(() => {
        const letterController = startNextLetter();
        letterController.start(); // Запускаем отображение букв

        document.getElementById('pkAlphabetDelayButton').onclick = function(e) {
            e.preventDefault();
            const inp = document.getElementById('pkAlphabetDelayInput');
            const n = Number(inp.value);
            letterController.setDelay(n); // Устанавливаем задержку
        };

        // Очистка при размонтировании компонента
        return () => {
            // Если у вас есть дополнительные функции очистки, можно их здесь добавить
        };
    }, []);

    return (
        <div className="App">
            <div id="pkAlphabet">
                <div id="pkAlphabetSettings">
                    <input id="pkAlphabetDelayInput" type="number" maxLength="4" size="4" defaultValue="1000" />
                    <button id="pkAlphabetDelayButton">интервал (мсек)</button>
                </div>
                <div id="pkAlphabetBlock" style={{ visibility: 'visible', position: 'absolute' }}>
                    <div className="pk-alphabet--letter" id="pkAlphabetVoiceLetter">П</div>
                    <div className="pk-alphabet--letter" id="pkAlphabetMoveLetter">Л</div>
                </div>
            </div>
        </div>
    );
}

export default App;
