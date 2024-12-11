/*The Problem Dampener is a reactor-mounted module that lets the reactor safety systems tolerate 
a single bad level in what would otherwise be a safe report. It's like the bad level never happened!

Now, the same rules apply as before, except if removing a single level from an unsafe report 
would make it safe, the report instead counts as safe.

How many reports are now safe?
*/

// Checks if an report is safe. Returns 1 if safe, 0 if not safe.
const safety_checker = (report: string[]) => {
    const rising = (Number(report[0]) - Number(report[1])) > 0 ?  -1 : 1
    return  report.reduce((acc: number, level: string, index: number) => {
        if (index == 0){ return 1}
        if (acc){
            const difference = Number(level) - Number(report[index - 1])
            return (4 > difference*rising &&  difference*rising > 0) ? 1 : 0
        } 
        return 0
    }, 1)
}

// Checks if the report is safe by removeing any one level.
const level_remover = (raport: string[]) => {
    for (let i = 0; i < raport.length; i++) {
         if (safety_checker(raport.slice(0,i).concat(raport.slice(i+1)))){ return 1 }
    }
    return 0
}

const main = async () => {
    const input = await Deno.readTextFile("input.txt");
    const input_array = input.split(/\r\n|\r|\n/)
    const reports = input_array.reduce(
        (acc:string[][], val:string) => {
        const levels = val.split(" ")
        return [...acc, levels]
    }, [])

    const safe_count = reports.reduce(
        (acc: number, report:string[]) => {
            if (safety_checker(report)) {
                return acc + 1
            } else {
                return acc + level_remover(report)
            }
        }, 0)

        console.log(safe_count)
}

main()