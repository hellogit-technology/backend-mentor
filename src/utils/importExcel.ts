import XLSX from 'xlsx'

const handlerFile = (buffer: any) => {
    const workBook = XLSX.readFile(buffer)
    const workSheet = workBook.Sheets[workBook.SheetNames[0]]

    const students = []
    let student = {}

    for (let cell in workSheet) {
        const cellAsString = cell.toString()

        console.log(cellAsString)
    }
}


