$(document).ready(function() {
    $(".carousel-control-prev").hover(function() {
        $("#tipCarousel").carousel('prev');
    });

    $(".carousel-control-next").hover(function() {
        $("#tipCarousel").carousel('next');
    });
});

$(window).on("load", function() {
    $(".preloader").fadeOut("slow");
});


$(document).ready(function(){
    let apiKey = '10234ddb93768d1a0fb15e163659b6bb';
    let url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=imperial';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            url += '&lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
            
            $.get(url, function(weatherData) {
                let weatherDescription = weatherData.weather[0].description;
                let temperature = weatherData.main.temp;
                let city = weatherData.name;
                $('#weather-info').html('Weather in ' + city + ': ' + weatherDescription + ', ' + temperature + '°F');
            });
        });
    } else {
        $('#weather-info').html('Geolocation is not supported by this browser.');
    }
});

//two diff keys becasue I only get 100 requests per key
$(document).ready(function(){
    //let apiKey = '7fe59a13e1d5b8f8ebb88c3c55400dee'
    let apiKey = '12c71c4bb02cfa938dbbfbfa41ccf3ff';
    let url = 'https://gnews.io/api/v4/top-headlines?token=' + apiKey + '&lang=en&country=us';

    $.get(url, function(newsData) {
        for(let i = 0; i < newsData.articles.length; i++) {
            let article = newsData.articles[i];
            $('#news').append('<h2>' + article.title + '</h2><p>' + article.description + '</p><a href="' + article.url + '" target="_blank">Read more</a>' + "<hr/>");
        }
    });
});


function validateForm() {
    let email = document.forms["signupForm"]["email"].value;
    let password = document.forms["signupForm"]["password"].value;
    let suffix = "@dons.usfca.edu";
    let passwordPattern = /^(?=.*\d)(?=.*[A-Z]).{6,}$/; // string needs to have at least one digit, one uppercase letter, and is at least 6 characters long

    if (email.indexOf(suffix, email.length - suffix.length) == -1) {
      alert("Must be a current USFCA Student, email must end with " + suffix);
      return false;
    } else if (!passwordPattern.test(password)) {
      alert("Password must contain at least one capitalized letter, a numeric digit, and must be at least 6 characters long");
      return false;
    }
}


$(document).ready(function(){
    $("#signupForm").submit(function(e){
        var email = $("#email").val();
        var suffix = "@dons.usfca.edu";
        if (!email.endsWith(suffix)) {
            alert("Must be a current USFCA Student, email must end with " + suffix);
            e.preventDefault();
        }
    });
});