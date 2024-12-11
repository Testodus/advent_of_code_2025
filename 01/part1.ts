
/*To find out, pair up the numbers and measure how far apart they are. 
Pair up the smallest number in the left list with the smallest number in the right list, 
then the second-smallest left number with the second-smallest right number, and so on.
Within each pair, figure out how far apart the two numbers are; you'll need to add up all of those distances.*/

const main = async () => {
    const input = await Deno.readTextFile("input.txt");
    const input_array = input.split(/\r\n|\r|\n/)

    const [list1, list2] = input_array.reduce(
        (acc:string[][], val: string) => {
            const current = val.split(" ")
            return [[...acc[0], current[0]], [...acc[1], current[3]]]
        }, [[],[]] 
    );

    list1.sort()
    list2.sort()

    const total_distance = list1.reduce(
        (acc, val, index) => {
            return acc + Math.abs(Number(val) - Number(list2[index]))
        }, 0
    )

    console.log(total_distance)
}

main()
