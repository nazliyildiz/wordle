const items = ['apple','nazlı', 'Beyza']

const wordToGuess = items[Math.floor(Math.random()*items.length)].toUpperCase();
        let attempts = 0;
        const maxAttempts = 6;
        const keyboardRows = [
            'QWERTYUIOP',
            'ASDFGHJKL',
            'ZXCVBNM'
        ];

        keyboardRows.forEach(row => {
            const keyRow = document.createElement('div');
            keyRow.classList.add('key-row');
            row.split('').forEach(letter => {
                const key = document.createElement('button');
                key.classList.add('key');
                key.textContent = letter;
                key.onclick = () => addToInput(letter);
                keyRow.appendChild(key);
            });
            document.getElementById('keyboard').appendChild(keyRow);
        });

        const controlRow = document.createElement('div');
        controlRow.classList.add('key-row');

        const enterKey = document.createElement('button');
        enterKey.classList.add('key');
        enterKey.textContent = 'Enter';
        enterKey.style.width = '72px';
        enterKey.onclick = makeGuess;
        controlRow.appendChild(enterKey);

        const deleteKey = document.createElement('button');
        deleteKey.classList.add('key');
        deleteKey.textContent = 'Del';
        deleteKey.style.width = '72px';
        deleteKey.onclick = () => {
            const guessInput = document.getElementById('guessInput');
            guessInput.value = guessInput.value.slice(0, -1);
        };
        controlRow.appendChild(deleteKey);

        document.getElementById('keyboard').appendChild(controlRow);

        function addToInput(letter) {
            const guessInput = document.getElementById('guessInput');
            if (guessInput.value.length < 5) {
                guessInput.value += letter;
            }
        }

        function createBlock(letter, isCorrect, isInWord) {
            const block = document.createElement('div');
            block.classList.add('char');
            block.textContent = letter;
            block.style.backgroundColor = isCorrect ? 'green' : isInWord ? 'orange' : 'grey';
            return block;
        }

        function makeGuess() {
            const guessInput = document.getElementById('guessInput');
            const guess = guessInput.value.toUpperCase();
            guessInput.value = '';

            if (guess.length !== 5) {
                alert('Lütfen 5 harfli bir kelime giriniz.');
                return;
            }

            const guessContainer = document.createElement('div');
            guessContainer.classList.add('guess');

            for (let i = 0; i < 5; i++) {
                const isCorrect = guess[i] === wordToGuess[i];
                const isInWord = wordToGuess.includes(guess[i]);
                const block = createBlock(guess[i], isCorrect, isInWord);
                guessContainer.appendChild(block);
            }

            document.getElementById('attempts').appendChild(guessContainer);

            attempts++;
            if (guess === wordToGuess) {
                alert('Tebrikler! Doğru Tahmin');
                location.reload();
            } else if (attempts >= maxAttempts) {
                alert('Üzgünüm, tüm denemelerinizi kullandınız. Doğru kelime şuydu ' + wordToGuess);
                location.reload();
            }
        }