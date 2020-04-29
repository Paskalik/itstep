mocha.setup('bdd');
const assert = chai.assert;

/* Task 1 */

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