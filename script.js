let hrs = document.getElementById('hrs');
let min = document.getElementById('min');
let sco = document.getElementById('sco');
let day = document.getElementById('day');
let month = document.getElementById('month');
let Year = document.getElementById('year');
let hDay = document.getElementById('hDay');
let hMonth = document.getElementById('hMonth');
let hYear = document.getElementById('hYear');

let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
let days = ['SUN','MON', 'TUS', 'WED', 'THR' ,'FRY', 'SAT'];

function update(){
    let currentTime = new Date();

    hrs.innerHTML= currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes()<10?'0':'') + currentTime.getMinutes();
    sco.innerHTML = (currentTime.getSeconds()<10?'0':'') + currentTime.getSeconds();
    day.innerHTML = days[currentTime.getDay()];
    month.innerHTML = months[currentTime.getMonth()];
    Year.innerHTML = currentTime.getFullYear(); 
    getIslamicDate();
}

let hijriMonths = 
                 ['Moharram', 'Safar', 'Rabīʿ al-Awwal',   'Rabīʿ al-Thānī', 'Jumādā al-Awwal', 'Jumādā al-Thānī', 'Rajab', 'Shaʿbān', 'Ramaḍān', 'Shawwāl', 'Dhū al-Qaʿdah', 'Dhū al-Ḥijjah'];

function getIslamicDate(date = new Date()) {
    let formatter = new Intl.DateTimeFormat('en-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    let parts = formatter.formatToParts(date);
    let hijriDay = parts.find(part => part.type === "day").value;
    let hijriMonth = parts.find(part => part.type === "month").value;
    let hijriYear = parts.find(part => part.type === "year").value;

    hDay.innerHTML = hijriDay;
    hMonth.innerHTML = hijriMonth;
    hYear.innerHTML = hijriYear;
}

window.addEventListener("load", function(){
    setInterval( update, 1000);
});

fetch("https://api.aladhan.com/v1/timingsByCity?city=Cork&country=Ireland&method=2")
  .then(response => response.json())
  .then(data => {
    document.getElementById("fajr").innerHTML = 'Fajr'+' '+ data.data.timings.Fajr;
    document.getElementById("dhuhr").innerHTML = 'dhuhr'+' '+data.data.timings.Dhuhr;
    document.getElementById("asr").innerHTML = 'asr' + ' ' + data.data.timings.Asr;
    document.getElementById("maghrib").innerHTML = 'maghrib' + ' ' + data.data.timings.Maghrib;
    document.getElementById("isha").innerHTML = 'isha' + ' ' + data.data.timings.Isha;
  })
  .catch(error => console.error("Error fetching prayer times:", error));




