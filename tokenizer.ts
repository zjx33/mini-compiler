enum TokenTypes {
    Paren,
    Name,
    Number
}
interface Token {
    type: TokenTypes
    value: string
}
function tokenizer(code: string) {
    const tokens: Token[] = []
    //指针
    let current = 0
    while (current < code.length) {
        let char = code[current]
        // 通过正则来判断是否是空格
        const WHITESPACE = /\s/
        if (WHITESPACE.test(char)) {
            current++
            continue
        }
        if (char === "(") {
            tokens.push({
                type: TokenTypes.Paren,
                value: char
            })
            current++
            continue
        }
        if (char === ")") {
            tokens.push({
                type: TokenTypes.Paren,
                value: char
            })
            current++
            continue
        }

        // 通过正则来判断是否是字母a~z
        const LETTERS = /[a-z]/i
        if (LETTERS.test(char)) {
            let value = ''
            while (LETTERS.test(char) && current < code.length) {
                value += char
                char = code[current++]
            }
            tokens.push({
                type: TokenTypes.Name,
                value: value
            })
        }
        // 通过正则来判断是否是数字0~9
        const NUMBERS = /[0-9]/
        if (NUMBERS.test(char)) {
            let value = ''
            while (NUMBERS.test(char) && current < code.length) {
                value += char
                char = code[current++]
            }
            tokens.push({
                type: TokenTypes.Number,
                value: value
            })
        }
    }
    return tokens
}