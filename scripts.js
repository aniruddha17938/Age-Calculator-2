const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function leapchecker(year) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        months[1] = 29;
    } else {
        months[1] = 28;
    }
}

function ageCalculate() {
    let today = new Date();
    let inputDate = new Date(document.getElementById("date-input").value);

    if (isNaN(inputDate.getTime())) {
        alert("Please select a valid birth date.");
        return;
    }

    let birthMonth, birthDate, birthYear;
    let birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear()
    };

    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth() + 1;
    let currentDate = today.getDate();

    leapchecker(currentYear);

    // Check for invalid future date
    if (
        birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year === currentYear) ||
        (birthDetails.date > currentDate && birthDetails.month === currentMonth && birthDetails.year === currentYear)
    ) {
        alert("Not yet born!");
        displayResult("-", "-", "-");
        return;
    }

    // Year calculation
    birthYear = currentYear - birthDetails.year;

    // Month calculation
    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    } else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }

    // Date calculation
    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    } else {
        birthMonth--;
        let days = months[currentMonth - 2] || months[11];
        birthDate = days + currentDate - birthDetails.date;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }

    displayResult(birthDate, birthMonth, birthYear);
}

function displayResult(bDate, bMonth, bYear) {
    document.getElementById("years").textContent = bYear;
    document.getElementById("months").textContent = bMonth;
    document.getElementById("days").textContent = bDate;
}
