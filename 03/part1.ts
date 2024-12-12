/**
 * It seems like the goal of the program is just to multiply some numbers. 
 * It does that with instructions like mul(X,Y), where X and Y are each 1-3 digit numbers. 
 * For instance, mul(44,46) multiplies 44 by 46 to get a result of 2024. 
 * Similarly, mul(123,4) would multiply 123 by 4.
 * 
 * However, because the program's memory has been corrupted, there are also many invalid characters 
 * that should be ignored, even if they look like part of a mul instruction. 
 * Sequences like mul(4*, mul(6,9!, ?(12,34), or mul ( 2 , 4 ) do nothing.
 * 
 * Scan the corrupted memory for uncorrupted mul instructions. 
 * What do you get if you add up all of the results of the multiplications?
 */

const main = async () => {
    const input_txt = await Deno.readTextFile("input.txt");
    const matches = [...input_txt.matchAll(/mul\(\d+,\d+\)/g)]

    const result = matches.reduce((acc, match) => {
        const number1 = match[0].match(/\d+/)?.[0]

        const regex = /\d+/y
        regex.lastIndex = 5 + number1!.length
        const number2 = regex.exec(match[0])?.[0]

        return acc + Number(number1) * Number(number2)
    }, 0)

    console.log(result)
}

main()