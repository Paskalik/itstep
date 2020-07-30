'use strict';

import "./sass/style.sass"

$(document).ready(function($) {
    let $input = $('#city')
    $('#cityB').click(function () {
        sessionStorage.clear()
        $('#cityC').html('')
        $('#overlay').fadeIn()
        let city = $input.val()
        let apiURI2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5b95c78fbeccd9c3e4d8472f16428c63`

        function $get1() {
            return $.ajax({
                url: apiURI2,
                type: "get",
                async: false,
                success: function (data) {
                $('#cityC').html('')
                sessionStorage.setItem("lat", data.city["coord"]["lat"])
                sessionStorage.setItem("lon", data.city["coord"]["lon"])
                sessionStorage.setItem("country", data.city["country"])
            }}).fail(function () {
                $("#overlay").fadeOut(300)
                $('#cityC').html('<p style="color:red";>ERROR</p><p>Проверьте корректность названия</p>')
                $('#tablo').css('display', 'none')
                $('#current').css('display', 'none')
            })
        }

        let $apiURI1 = function () {
            let lat = sessionStorage.getItem("lat")
            let lon = sessionStorage.getItem("lon")
            return 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&exclude=minutely,hourly&appid=5b95c78fbeccd9c3e4d8472f16428c63'
        }

        function $get2() {
            return $.ajax({
            url: $apiURI1(),
                type: "get",
                async: false,
                success: function (data) {
                $('#cityC').html('')
                sessionStorage.setItem("data", JSON.stringify(data))
                    data = JSON.parse(sessionStorage.getItem("data"))
                    $dataHandler3(data)
            }})
                .fail(function () {
                    $("#overlay").fadeOut(300)
                    $('#cityC').html('<p style="color:red";>ERROR</p><p>Проверьте корректность названия</p>')
                    $('#tablo').css('display', 'none')
                    $('#current').css('display', 'none')
                })
        }

        function $dataHandler3(data) {
            $("#overlay").fadeOut(300)
            $showDateTime()
            $('#current').css('display', 'flex')
            $('#tablo').css('display', 'flex')
            let $now = new Date()
            $('#cityA').text(city + ', ' + sessionStorage.getItem("country"))
            $('#time').text($actDate($now))
            let $imgURL = "https://openweathermap.org/img/w/" + data["current"].weather[0]["icon"] + ".png"
            $('#tmp').attr("src", $imgURL)
            $('#desc').html(data["current"].weather[0]["main"])
            $('#temp').html(Math.floor(data["current"].temp) + "°C")
            $('#wind').text('Wind: ' + data["current"].wind_speed * 3.6 + 'kph')
            $('#precip').text('Precip: ' + data["current"].wind_speed + 'mm')
            $('#pressure').text('Pressure: ' + data["current"].pressure + 'mb')

            $("#date1").html($formatDate($now, 1))
            $("#temp1").html(Math.floor($averageTemp(data["daily"][0].temp)) + "°C")
            $imgURL = "https://openweathermap.org/img/w/" + data["daily"][0].weather[0]["icon"] + ".png"
            $("#tmp4").attr("src", $imgURL)

            $("#date2").html($formatDate($now, 2))
            $("#temp2").html(Math.floor($averageTemp(data["daily"][1].temp)) + "°C")
            $imgURL = "https://openweathermap.org/img/w/" + data["daily"][1].weather[0]["icon"] + ".png"
            $("#tmp5").attr("src", $imgURL)

            $("#date3").html($formatDate($now, 3))
            $("#temp3").html(Math.floor($averageTemp(data["daily"][2].temp)) + "°C")
            $imgURL = "https://openweathermap.org/img/w/" + data["daily"][2].weather[0]["icon"] + ".png"
            $("#tmp6").attr("src", $imgURL)

            $("#date4").html($formatDate($now, 4))
            $("#temp4").html(Math.floor($averageTemp(data["daily"][3].temp)) + "°C")
            $imgURL = "https://openweathermap.org/img/w/" + data["daily"][3].weather[0]["icon"] + ".png"
            $("#tmp7").attr("src", $imgURL)

            $("#date5").html($formatDate($now, 5))
            $("#temp5").html(Math.floor($averageTemp(data["daily"][4].temp)) + "°C")
            $imgURL = "https://openweathermap.org/img/w/" + data["daily"][4].weather[0]["icon"] + ".png"
            $("#tmp8").attr("src", $imgURL)
        }
        $get1()
        $get2()
    })

    function $showDateTime() {

        let $d = new Date()
        let $n1, $n2, $n3, $n4, $n5
        let $weekday = new Array(7)
        $weekday[0] = "Sun"
        $weekday[1] = "Mon"
        $weekday[2] = "Tue"
        $weekday[3] = "Wed"
        $weekday[4] = "Thu"
        $weekday[5] = "Fri"
        $weekday[6] = "Sat"

        if($d.getDay() >= 2){
            $n1 = $weekday[($d.getDay()+1)]
            $n2 = $weekday[($d.getDay()+2)]
            $n3 = $weekday[($d.getDay()+3)]
            $n4 = $weekday[($d.getDay()+4)]
            $n5 = $weekday[7-($d.getDay()+5)]} if($d.getDay() >= 3)
        {
            $n1 = $weekday[($d.getDay()+1)]
            $n2 = $weekday[($d.getDay()+2)]
            $n3 = $weekday[7-($d.getDay()+3)]
            $n4 = $weekday[9-($d.getDay()+4)]
            $n5 = $weekday[11-($d.getDay()+5)]} if($d.getDay() >= 4)
        {
            $n1 = $weekday[($d.getDay()+1)]
            $n2 = $weekday[7-($d.getDay()+2)]
            $n3 = $weekday[9-($d.getDay()+3)]
            $n4 = $weekday[11-($d.getDay()+4)]
            $n5 = $weekday[13-($d.getDay()+5)]} if($d.getDay() >= 5)
        {
            $n1 = $weekday[7-($d.getDay()+1)]
            $n2 = $weekday[9-($d.getDay()+2)]
            $n3 = $weekday[11-($d.getDay()+3)]
            $n4 = $weekday[13-($d.getDay()+4)]
            $n5 = $weekday[15-($d.getDay()+5)]}  if($d.getDay() < 2)
        {
            $n1 = $weekday[($d.getDay()+1)]
            $n2 = $weekday[($d.getDay()+2)]
            $n3 = $weekday[($d.getDay()+3)]
            $n4 = $weekday[($d.getDay()+4)]
            $n5 = $weekday[($d.getDay()+5)]

        }

        $("#day1").innerHTML = $n1
        $("#day2").innerHTML = $n2
        $("#day3").innerHTML = $n3
        $("#day4").innerHTML = $n4
        $("#day5").innerHTML = $n5
    }

    function $formatDate(date, count) {
        let $d = date.getDate() + count
        let $m = date.getMonth() + 1
        let $y = date.getFullYear()
        return ($d + '.' + $m + '.' + $y)
    }

    function $actDate(date) {
        let $d = date.getDate()
        let $m = date.getMonth() + 1
        let $y = date.getFullYear()
        let $hour = date.getHours()
        let $min = date.getMinutes()
        if ($min < 10) {
            $min = '0' + $min
        }
        return ($hour + ':' + $min + ' ' + $d + '.' + $m + '.' + $y)
    }

    function $averageTemp(temp) {
        return (temp["morn"] + temp["day"] + temp["eve"] + temp["night"])/4
    }
})
