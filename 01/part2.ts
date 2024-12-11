/* This time, you'll need to figure out exactly how often each number from the left list 
appears in the right list. Calculate a total similarity score by adding up each number in 
the left list after multiplying it by the number of times that number appears in the right list.*/

const main = async () => {
    const input = await Deno.readTextFile("input.txt");
    const input_array = input.split(/\r\n|\r|\n/)

    const [list1, list2] = input_array.reduce(
        (acc:string[][], val: string) => {
            const current = val.split(" ")
            return [[...acc[0], current[0]], [...acc[1], current[3]]]
        }, [[],[]] 
    );

    const count2: {[key:string]: number} = {}
    list2.forEach((x) => {count2[x] = (count2[x] || 0) + 1})

    const similarity_score = list1.reduce(
        (acc, val) => {
            return acc + Number(val) * (count2[val] || 0)
        }, 0
    )

    console.log(similarity_score)
}

main()