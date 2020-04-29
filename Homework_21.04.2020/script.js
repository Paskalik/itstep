'use strict';
/* Task 1 */
class extendedString extends String {
    remove(index) {

    }
    insert(index,sign) {

    }
    trimSign() {

    }
    toggle() {

    }
    counter(sign) {

    }
}
/* Task 2 */
class MyDate extends Date {
    constructor(day, month, year) {
        super(year, month - 1, day);
        this.day = day;
        this.month = month - 1;
        this.year = year;
    }
    today = new Date();
    dayInText(day) {
        const values = ['первое', 'второе', 'третье', 'четвертое', 'пятое', 'шестое', 'седьмое', 'восьмое', 'девятое', 'десятое', 'один', 'две', 'три', 'четыр', 'пят', 'шест', 'сем', 'восем', 'девят'];
        if (day < 0 || day >= 32 || day === null || day === undefined) {
            return 'Некорректное число';
        }
        if (day >= 1 && day <= 10) {
            return values[day - 1];
        }
        if (day > 10 && day <= 19) {
            return values[day - 1] + 'надцатое';
        }
        if (day === 20) {
            return 'двадцатое';
        }
        if (day > 20 && day <= 29) {
            return 'двадцать ' + values[day - 21];
        }
        if (day === 30) {
            return 'тридцатое';
        }
        if (day === 31) {
            return 'тридцать первое';
        }
    }
    monthInText(month) {
        const values = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
        if (month < 0 || month >= 13 || month === null || month === undefined) {
            return 'Некорректное число';
        } else {
            return values[month];
        }
    }
    showDate() {
        return this.dayInText(this.day) + ' ' + this.monthInText(this.month);
    }
    isFuture() {
        if (this < this.today) {
            return false;
        }
        else {
            if (this >= this.today) {
                return true;
            }
        }
    }
    isLeapYear() {
        return ((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0);
    }
    nextDay() {
        let nextDay = this;
        nextDay.setDate(nextDay.getDate() + 1);
        return (nextDay.getDate() + '/' + (nextDay.getMonth() + 1) + '/' + nextDay.getFullYear());
    }
}