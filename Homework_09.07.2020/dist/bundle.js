/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\n$(document).ready(function($) {\r\n    let $input = $('#city')\r\n    $('#cityB').click(function () {\r\n        sessionStorage.clear()\r\n        $('#cityC').html('')\r\n        $('#overlay').fadeIn()\r\n        let city = $input.val()\r\n        let apiURI2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=5b95c78fbeccd9c3e4d8472f16428c63`\r\n\r\n        function $get1() {\r\n            return $.ajax({\r\n                url: apiURI2,\r\n                type: \"get\",\r\n                async: false,\r\n                success: function (data) {\r\n                $('#cityC').html('')\r\n                sessionStorage.setItem(\"lat\", data.city[\"coord\"][\"lat\"])\r\n                sessionStorage.setItem(\"lon\", data.city[\"coord\"][\"lon\"])\r\n                sessionStorage.setItem(\"country\", data.city[\"country\"])\r\n            }}).fail(function () {\r\n                $(\"#overlay\").fadeOut(300)\r\n                $('#cityC').html('<p style=\"color:red\";>ERROR</p><p>Проверьте корректность названия</p>')\r\n                $('#tablo').css('display', 'none')\r\n                $('#current').css('display', 'none')\r\n            })\r\n        }\r\n\r\n        let $apiURI1 = function () {\r\n            let lat = sessionStorage.getItem(\"lat\")\r\n            let lon = sessionStorage.getItem(\"lon\")\r\n            return 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&exclude=minutely,hourly&appid=5b95c78fbeccd9c3e4d8472f16428c63'\r\n        }\r\n\r\n        function $get2() {\r\n            return $.ajax({\r\n            url: $apiURI1(),\r\n                type: \"get\",\r\n                async: false,\r\n                success: function (data) {\r\n                $('#cityC').html('')\r\n                sessionStorage.setItem(\"data\", JSON.stringify(data))\r\n                    data = JSON.parse(sessionStorage.getItem(\"data\"))\r\n                    $dataHandler3(data)\r\n            }})\r\n                .fail(function () {\r\n                    $(\"#overlay\").fadeOut(300)\r\n                    $('#cityC').html('<p style=\"color:red\";>ERROR</p><p>Проверьте корректность названия</p>')\r\n                    $('#tablo').css('display', 'none')\r\n                    $('#current').css('display', 'none')\r\n                })\r\n        }\r\n\r\n        function $dataHandler3(data) {\r\n            $(\"#overlay\").fadeOut(300)\r\n            $showDateTime()\r\n            $('#current').css('display', 'flex')\r\n            $('#tablo').css('display', 'flex')\r\n            let $now = new Date()\r\n            $('#cityA').text(city + ', ' + sessionStorage.getItem(\"country\"))\r\n            $('#time').text($actDate($now))\r\n            let $imgURL = \"https://openweathermap.org/img/w/\" + data[\"current\"].weather[0][\"icon\"] + \".png\"\r\n            $('#tmp').attr(\"src\", $imgURL)\r\n            $('#desc').html(data[\"current\"].weather[0][\"main\"])\r\n            $('#temp').html(Math.floor(data[\"current\"].temp) + \"°C\")\r\n            $('#wind').text('Wind: ' + data[\"current\"].wind_speed * 3.6 + 'kph')\r\n            $('#precip').text('Precip: ' + data[\"current\"].wind_speed + 'mm')\r\n            $('#pressure').text('Pressure: ' + data[\"current\"].pressure + 'mb')\r\n\r\n            $(\"#date1\").html($formatDate($now, 1))\r\n            $(\"#temp1\").html(Math.floor($averageTemp(data[\"daily\"][0].temp)) + \"°C\")\r\n            $imgURL = \"https://openweathermap.org/img/w/\" + data[\"daily\"][0].weather[0][\"icon\"] + \".png\"\r\n            $(\"#tmp4\").attr(\"src\", $imgURL)\r\n\r\n            $(\"#date2\").html($formatDate($now, 2))\r\n            $(\"#temp2\").html(Math.floor($averageTemp(data[\"daily\"][1].temp)) + \"°C\")\r\n            $imgURL = \"https://openweathermap.org/img/w/\" + data[\"daily\"][1].weather[0][\"icon\"] + \".png\"\r\n            $(\"#tmp5\").attr(\"src\", $imgURL)\r\n\r\n            $(\"#date3\").html($formatDate($now, 3))\r\n            $(\"#temp3\").html(Math.floor($averageTemp(data[\"daily\"][2].temp)) + \"°C\")\r\n            $imgURL = \"https://openweathermap.org/img/w/\" + data[\"daily\"][2].weather[0][\"icon\"] + \".png\"\r\n            $(\"#tmp6\").attr(\"src\", $imgURL)\r\n\r\n            $(\"#date4\").html($formatDate($now, 4))\r\n            $(\"#temp4\").html(Math.floor($averageTemp(data[\"daily\"][3].temp)) + \"°C\")\r\n            $imgURL = \"https://openweathermap.org/img/w/\" + data[\"daily\"][3].weather[0][\"icon\"] + \".png\"\r\n            $(\"#tmp7\").attr(\"src\", $imgURL)\r\n\r\n            $(\"#date5\").html($formatDate($now, 5))\r\n            $(\"#temp5\").html(Math.floor($averageTemp(data[\"daily\"][4].temp)) + \"°C\")\r\n            $imgURL = \"https://openweathermap.org/img/w/\" + data[\"daily\"][4].weather[0][\"icon\"] + \".png\"\r\n            $(\"#tmp8\").attr(\"src\", $imgURL)\r\n        }\r\n        $get1()\r\n        $get2()\r\n    })\r\n\r\n    function $showDateTime() {\r\n\r\n        let $d = new Date()\r\n        let $n1, $n2, $n3, $n4, $n5\r\n        let $weekday = new Array(7)\r\n        $weekday[0] = \"Sun\"\r\n        $weekday[1] = \"Mon\"\r\n        $weekday[2] = \"Tue\"\r\n        $weekday[3] = \"Wed\"\r\n        $weekday[4] = \"Thu\"\r\n        $weekday[5] = \"Fri\"\r\n        $weekday[6] = \"Sat\"\r\n\r\n        if($d.getDay() >= 2){\r\n            $n1 = $weekday[($d.getDay()+1)]\r\n            $n2 = $weekday[($d.getDay()+2)]\r\n            $n3 = $weekday[($d.getDay()+3)]\r\n            $n4 = $weekday[($d.getDay()+4)]\r\n            $n5 = $weekday[7-($d.getDay()+5)]} if($d.getDay() >= 3)\r\n        {\r\n            $n1 = $weekday[($d.getDay()+1)]\r\n            $n2 = $weekday[($d.getDay()+2)]\r\n            $n3 = $weekday[7-($d.getDay()+3)]\r\n            $n4 = $weekday[9-($d.getDay()+4)]\r\n            $n5 = $weekday[11-($d.getDay()+5)]} if($d.getDay() >= 4)\r\n        {\r\n            $n1 = $weekday[($d.getDay()+1)]\r\n            $n2 = $weekday[7-($d.getDay()+2)]\r\n            $n3 = $weekday[9-($d.getDay()+3)]\r\n            $n4 = $weekday[11-($d.getDay()+4)]\r\n            $n5 = $weekday[13-($d.getDay()+5)]} if($d.getDay() >= 5)\r\n        {\r\n            $n1 = $weekday[7-($d.getDay()+1)]\r\n            $n2 = $weekday[9-($d.getDay()+2)]\r\n            $n3 = $weekday[11-($d.getDay()+3)]\r\n            $n4 = $weekday[13-($d.getDay()+4)]\r\n            $n5 = $weekday[15-($d.getDay()+5)]}  if($d.getDay() < 2)\r\n        {\r\n            $n1 = $weekday[($d.getDay()+1)]\r\n            $n2 = $weekday[($d.getDay()+2)]\r\n            $n3 = $weekday[($d.getDay()+3)]\r\n            $n4 = $weekday[($d.getDay()+4)]\r\n            $n5 = $weekday[($d.getDay()+5)]\r\n\r\n        }\r\n\r\n        $(\"#day1\").innerHTML = $n1\r\n        $(\"#day2\").innerHTML = $n2\r\n        $(\"#day3\").innerHTML = $n3\r\n        $(\"#day4\").innerHTML = $n4\r\n        $(\"#day5\").innerHTML = $n5\r\n    }\r\n\r\n    function $formatDate(date, count) {\r\n        let $d = date.getDate() + count\r\n        let $m = date.getMonth() + 1\r\n        let $y = date.getFullYear()\r\n        return ($d + '.' + $m + '.' + $y)\r\n    }\r\n\r\n    function $actDate(date) {\r\n        let $d = date.getDate()\r\n        let $m = date.getMonth() + 1\r\n        let $y = date.getFullYear()\r\n        let $hour = date.getHours()\r\n        let $min = date.getMinutes()\r\n        if ($min < 10) {\r\n            $min = '0' + $min\r\n        }\r\n        return ($hour + ':' + $min + ' ' + $d + '.' + $m + '.' + $y)\r\n    }\r\n\r\n    function $averageTemp(temp) {\r\n        return (temp[\"morn\"] + temp[\"day\"] + temp[\"eve\"] + temp[\"night\"])/4\r\n    }\r\n})\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });