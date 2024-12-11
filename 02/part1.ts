/*The engineers are trying to figure out which reports are safe. 
The Red-Nosed reactor safety systems can only tolerate levels that are either gradually increasing 
or gradually decreasing. So, a report only counts as safe if both of the following are true:

The levels are either all increasing or all decreasing.
Any two adjacent levels differ by at least one and at most three. 

How many reports are safe?
*/

const main = async () => {
    const input = await Deno.readTextFile("input.txt");
    const input_array = input.split(/\r\n|\r|\n/)
    const reports = input_array.reduce(
        (acc:string[][], val:string) => {
        const levels = val.split(" ")
        return [...acc, levels]
    }, [])

    console.log(reports)

    const safe_count = reports.reduce(
        (acc: number, report:string[]) => {

            const rising = (Number(report[0]) - Number(report[1])) > 0 ?  -1 : 1 
            const safe = report.reduce((acc: number, level: string, index: number) => {

                if (index == 0){ return 1}
                if (acc){
                    const difference = Number(level) - Number(report[index - 1])
                    return (4 > difference*rising &&  difference*rising > 0) ? 1 : 0
                } 
                return 0
            }, 1)
            return acc + safe

        }, 0)

        console.log(safe_count)
}

main()