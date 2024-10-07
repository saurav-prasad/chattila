// sorting an array based on timestamp
const sortArray = (arr) => {
    const sortedArray = [...arr];
    // sortedArray.sort((a, b) => a.timestamp.localeCompare(b.timestamp)).reverse();
    sortedArray.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    return sortedArray;
}
export default sortArray