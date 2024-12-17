/**
 * Word search, how many times does XMAS appear?
 * Overlapping, backwards, up, down and all kinds of diagonal allowed.
 */

const main = async () => {
    const input = await Deno.readTextFile("input.txt");
    const input_array = input.split(/\r\n|\r|\n/)

    const word_search = input_array.reduce(
        (acc: string[][], val: string) => {
        return acc.concat([val.split("")])
    }, [])

    const result = word_search.reduce(
        (acc, row, y) => {
            return acc + row.reduce((acc, char, x) => {
                let xmas_count = 0
                if (char == "X") {
                    const regex = /XMAS/
                    // left
                    if (regex.test('X' + row[x-1] + row[x-2] + row[x-3])){
                        xmas_count += 1
                    }
                    // right
                    if (regex.test('X' + row[x+1] + row[x+2] + row[x+3])){
                        xmas_count += 1
                    }
                    // up
                    if (regex.test('X' + word_search[y-1]?.[x]  + word_search[y-2]?.[x] + word_search[y-3]?.[x])){
                        xmas_count += 1
                    }
                    // down
                    if (regex.test('X' + word_search[y+1]?.[x]  + word_search[y+2]?.[x] + word_search[y+3]?.[x])){
                        xmas_count += 1
                    }
                    // diagonal up right
                    if (regex.test('X' + word_search[y-1]?.[x+1]  + word_search[y-2]?.[x+2] + word_search[y-3]?.[x+3])){
                        xmas_count += 1
                    }
                    // diagoanl down left
                    if (regex.test('X' + word_search[y+1]?.[x-1]  + word_search[y+2]?.[x-2] + word_search[y+3]?.[x-3])){
                        xmas_count += 1
                    }
                    // diagonal up left
                    if (regex.test('X' + word_search[y-1]?.[x-1]  + word_search[y-2]?.[x-2] + word_search[y-3]?.[x-3])){
                        xmas_count += 1
                    }
                    // diagonal down right
                    if (regex.test('X' + word_search[y+1]?.[x+1]  + word_search[y+2]?.[x+2] + word_search[y+3]?.[x+3])){
                        xmas_count += 1
                    }
                }
                return acc + xmas_count
            }, 0)
    }, 0)
    console.log(result)
}

main()