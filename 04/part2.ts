/**
 * Word search, how many times does
 * 
 * (a) M S   or   (b)  M M   or  (c)  S M   or  (d) S S
 *      A               A              A             A
 *     M S             S S            S M           M M 
 * 
 *  appear? Ovelapping allowed.
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
                if (char == "A") {
                    const regex = /MAS|SAM/
                    if (regex.test(word_search[y-1]?.[x-1] + 'A' + word_search[y+1]?.[x+1]) 
                        && regex.test(word_search[y-1]?.[x+1] + 'A' + word_search[y+1]?.[x-1])){
                        return acc +1
                    }
                }
                return acc
            }, 0)
    }, 0)
    console.log(result)
}

main()