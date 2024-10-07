// formatting the timestamp
const timePassed = (timestamp,) => {
    const startDateTime = new Date(timestamp);
    const currentDateTime = new Date();

    // Calculate the time difference in milliseconds
    let timeDifference = currentDateTime - startDateTime;
    if (timeDifference < 0) timeDifference *= -1

    // Convert milliseconds to seconds, minutes, hours, days, months, and years
    const totalSeconds = Math.floor(timeDifference / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);

    let formattedTime
    if (totalHours > 48) {
        formattedTime = `${startDateTime.toLocaleDateString()}, ${startDateTime.getHours()}:${startDateTime.getMinutes()}`
        // console.log(startDateTime.toLocaleDateString(), startDateTime.getHours() + ":" + startDateTime.getMinutes());
    }
    else if (totalHours > 24 && totalHours < 48) {
        formattedTime = `Yesterday ${startDateTime.getHours()}:${startDateTime.getMinutes()}`
        // console.log(startDateTime.toLocaleDateString(), startDateTime.getHours() + ":" + startDateTime.getMinutes());
    } else {
        formattedTime = `Today ${startDateTime.getHours()}:${startDateTime.getMinutes()}`
        // console.log(startDateTime.toLocaleDateString(), startDateTime.getHours() + ":" + startDateTime.getMinutes());
    }

    return formattedTime
}

export default timePassed