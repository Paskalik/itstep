mocha.setup('bdd');
const assert = chai.assert;

/* Task 1 */
describe('myString, remove()', function () {
    it('new MyString("qwerty").remove(0) => werty', function() {
        let myString = new MyString("qwerty");
        let res = myString.remove(0);
        assert.equal(res,'werty');
    });
    it('new MyString("qwerty").remove(2) => qwrty', function() {
        let myString = new MyString("qwerty");
        let res = myString.remove(2);
        assert.equal(res,'qwrty');
    });
    it('new MyString("qwerty").remove(10) => qwerty', function() {
        let myString = new MyString("qwerty");
        let res = myString.remove(10);
        assert.equal(res,'qwerty');
    });
    it('new MyString("qwerty").remove(-4) => qwerty', function() {
        let myString = new MyString("qwerty");
        let res = myString.remove(-4);
        assert.equal(res,'qwerty');
    });
})

describe('myString, insert()', function () {
    it('new MyString("qwerty").insert(0, X) => Xwerty', function() {
        let myString = new MyString("qwerty");
        let res = myString.insert(0, 'X');
        assert.equal(res,'Xwerty');
    });
    it('new MyString("qwerty").insert(2, X) => qwXrty', function() {
        let myString = new MyString("qwerty");
        let res = myString.insert(2, 'X');
        assert.equal(res,'qwXrty');
    });
    it('new MyString("qwerty").insert(10, X) => qwertyX', function() {
        let myString = new MyString("qwerty");
        let res = myString.insert(10, 'X');
        assert.equal(res,'qwertyX');
    });
    it('new MyString("qwerty").insert(-4, X) => Xqwerty', function() {
        let myString = new MyString("qwerty");
        let res = myString.insert(-4, 'X');
        assert.equal(res,'Xqwerty');
    });
})

describe('myString, trimSign()', function () {
    it('new MyString("qwerty").trimSign() => qwerty', function() {
        let myString = new MyString("qwerty");
        let res = myString.trimSign();
        assert.equal(res,'qwerty');
    });
    it('new MyString("qweeeerty").trimSign() => qwerty', function() {
        let myString = new MyString("qweeeerty");
        let res = myString.trimSign();
        assert.equal(res,'qwerty');
    });
    it('new MyString("qweeertttty").trimSign() => qwerty', function() {
        let myString = new MyString("qweeertttty");
        let res = myString.trimSign();
        assert.equal(res,'qwerty');
    });
    it('new MyString("qwe....rty").trimSign() => qwe.rty', function() {
        let myString = new MyString("qwe....rty");
        let res = myString.trimSign();
        assert.equal(res,'qwe.rty');
    });
})

describe('myString, toggle()', function () {
    it('new MyString("qwerty").toggle() => QWERTY', function() {
        let myString = new MyString("qwerty");
        let res = myString.toggle();
        assert.equal(res,'QWERTY');
    });
    it('new MyString("QWERTY").toggle() => qwerty', function() {
        let myString = new MyString("QWERTY");
        let res = myString.toggle();
        assert.equal(res,'qwerty');
    });
    it('new MyString("qweRTY").toggle() => QWErty', function() {
        let myString = new MyString("qweRTY");
        let res = myString.toggle();
        assert.equal(res,'QWErty');
    });
})

describe('myString, counter()', function () {
    it('new MyString("qwerty").counter(\'e\') => 1', function() {
        let myString = new MyString("qwerty");
        let res = myString.counter('e');
        assert.equal(res,1);
    });
    it('new MyString("apple").counter(\'p\') => 2', function() {
        let myString = new MyString("apple");
        let res = myString.counter('p');
        assert.equal(res,2);
    });
    it('new MyString("avokado").counter(\'a\') => 2', function() {
        let myString = new MyString("avokado");
        let res = myString.counter('a');
        assert.equal(res,2);
    });
})

/* Task 2 */
describe('myDate, showDate()', function () {
    it('new MyDate(20, 1, 1990).showDate() => двадцатое января', function() {
        let myDate = new MyDate(20, 1, 1990);
        let res = myDate.showDate();
        assert.equal(res,'двадцатое января');
    });
    it('new MyDate(21, 1, 1990).showDate() => двадцать первое января', function () {
        let myDate = new MyDate(21, 1, 1990);
        let res = myDate.showDate();
        assert.equal(res,'двадцать первое января');
    });
})
describe('myDate, isFuture()', function () {
    it('new MyDate(20, 5, 2056).isFuture() => true', function() {
        let myDate = new MyDate(20, 5, 2056);
        let res = myDate.isFuture();
        assert.isTrue(res);
    });
    it('new MyDate(20, 6, 1990).isFuture() => false', function () {
        let myDate = new MyDate(20, 6, 1990);
        let res = myDate.isFuture();
        assert.isFalse(res);
    });
})
describe('myDate, isLeapYear()', function () {
    it('new MyDate(20, 6, 1990).isLeapYear() => false', function() {
        let myDate = new MyDate(20, 6, 1990);
        let res = myDate.isLeapYear();
        assert.isFalse(res);
    });
    it('new MyDate(20, 6, 2020).isLeapYear() => true', function () {
        let myDate = new MyDate(20, 6, 2020);
        let res = myDate.isLeapYear();
        assert.isTrue(res);
    });
})
describe('myDate, nextDay()', function () {
    it('new MyDate(20, 6, 2020).nextDay() => 21/6/2020', function() {
        let myDate = new MyDate(20, 6, 2020);
        let res = myDate.nextDay();
        assert.equal(res, '21/6/2020');
    });
    it('new MyDate(31, 1, 2020).nextDay() => 1/2/2020', function () {
        let myDate = new MyDate(31, 1, 2020);
        let res = myDate.nextDay();
        assert.equal(res, '1/2/2020');
    });
    it('new MyDate(28, 2, 2020).nextDay() => 29/2/2020', function () {
        let myDate = new MyDate(28, 2, 2020);
        let res = myDate.nextDay();
        assert.equal(res, '29/2/2020');
    });
    it('new MyDate(28, 6, 2019).nextDay() => 1/3/2020', function () {
        let myDate = new MyDate(28, 6, 2019);
        let res = myDate.nextDay();
        assert.notEqual(res, '1/3/2020');
    });
    it('new MyDate(31, 12, 2020).nextDay() => 1/1/2021', function () {
        let myDate = new MyDate(31, 12, 2020);
        let res = myDate.nextDay();
        assert.equal(res, '1/1/2021');
    });
})