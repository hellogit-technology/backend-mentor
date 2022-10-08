export const getMonth = () => {
    const date = new Date();
    const month = date.getMonth();
    if(month === 0) {
        return 1
    }
    return month - 1
}