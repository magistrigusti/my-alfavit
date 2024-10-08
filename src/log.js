// alphabet.js
export function startNextLetter() {
    const LEFT = 'Л';
    const RIGHT = 'П';
    const BOTH = 'О';
    
    const alphabet = [
        'A', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И',
        'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т',
        'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Э', 'Ю', 'Я'
    ];

    let continuum;
    let sarge = 0;
    let delay = 1000;

    function generateContinuum() {
        const l = alphabet.length;
        const coeffs = Array.from({ length: l }, () => Math.random());
        const letterIndices = Array.from({ length: l }, (_, i) => i);

        // Сортировка
        for (let i = l - 1; i > 1; i--) {
            for (let j = 0; j < i; j++) {
                if (coeffs[j] > coeffs[j + 1]) {
                    [coeffs[j], coeffs[j + 1]] = [coeffs[j + 1], coeffs[j]];
                    [letterIndices[j], letterIndices[j + 1]] = [letterIndices[j + 1], letterIndices[j]];
                }
            }
        }

        const letters = letterIndices.map(index => alphabet[index]);
        const moves = Array(l).fill(null);

        for (let i = 0; i < l; i++) {
            if (!moves[i]) {
                const randMove = Math.random() < 0.333 ? LEFT : (Math.random() < 0.666 ? BOTH : RIGHT);
                moves[i] = randMove;
            }
        }

        return [letters, moves];
    }

    function nextLetter() {
        if (sarge === alphabet.length) {
            continuum = generateContinuum();
            sarge = 0;
        }

        const wg = document.getElementById('pkAlphabetBlock');
        wg.style.visibility = 'hidden';
        document.getElementById('pkAlphabetVoiceLetter').innerHTML = continuum[0][sarge];
        document.getElementById('pkAlphabetMoveLetter').innerHTML = continuum[1][sarge];

        wg.style.left = Math.ceil(Math.random() * (document.documentElement.clientWidth - wg.clientWidth - 30)) + 15 + 'px';
        wg.style.top = Math.ceil(Math.random() * (document.documentElement.clientHeight - wg.clientHeight - 30)) + 15 + 'px';
        wg.style.visibility = 'visible';

        sarge++;
        setTimeout(nextLetter, delay);
    }

    return {
        start: () => {
            continuum = generateContinuum();
            nextLetter();
        },
        setDelay: (newDelay) => {
            delay = (newDelay >= 1 && newDelay <= 5000) ? newDelay : delay;
        }
    };
}
