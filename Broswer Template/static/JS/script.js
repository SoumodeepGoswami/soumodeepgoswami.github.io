function updateTime() {
    // Get the current date and time
    const now = new Date();

    // Extract hours, minutes, and seconds
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Add leading zeros if necessary
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    // Format the time as HH:MM:SS (24-hour format)
    const timeString24Hour = `${hours}:${minutes}:${seconds}`;

    // Convert to 12-hour format
    let hours12 = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const ampm = hours < 12 ? 'AM' : 'PM';
    hours12 = hours12 < 10 ? `0${hours12}` : hours12; // Add leading zero if necessary

    // Format the time as HH:MM:SS AM/PM (12-hour format)
    const timeString12Hour = `${hours12}:${minutes}:${seconds} ${ampm}`;

    // Update the content of the HTML element with id "time-24-hour"
    document.getElementById('time-24-hour').textContent = timeString24Hour;

    // Update the content of the HTML element with id "time-12-hour"
    document.getElementById('time-12-hour').textContent = timeString12Hour;
}

// Update the time immediately
updateTime();

// Update the time every second (1000 milliseconds)
setInterval(updateTime, 1000);