function changePage (location) {        // redirects to correct page
    if(location === 'howto') {
        window.location.href = "rules.html";
    } else if (location === 'game') {
        window.location.href = "game.html";
    }
}

function currentDate () {       // gets current date and configures string into proper format.
    today = new Date();
    var date = today.getDate();
    var month = today.getMonth();
    var year = today.getFullYear();

    const monthName = [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    var fullString = monthName[month] + ' ' + date + ', ' + year;

    document.querySelector(".date").innerHTML = fullString
}

currentDate();