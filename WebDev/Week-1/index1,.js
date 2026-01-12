const crypto = require('crypto');

function findHashWithPrefix(prefix) {
    let input = 59618;

    while (true) {
        const inputStr = input.toString();

        const hash = crypto
            .createHash('sha256')
            .update(inputStr)
            .digest('hex');

        if (hash.startsWith(prefix)) {
            return { input: inputStr, hash };
        }

        input++;
    }
}

const result = findHashWithPrefix('00000');
console.log(`Input: ${result.input}`);
console.log(`Hash: ${result.hash}`);
