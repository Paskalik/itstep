'use strict';

//можно и нужно было сделать модульно, но у меня не работает почему-то с бутстрапом, разбираться не было времени

let $book = [
    {
        "id" : "1",
        "title" : "Name5",
        "author" : "author1",
        "year" : "2020",
        "publisher" : "publisher1",
        "pages" : "99",
        "instances" : "10"
    },
    {
        "id" : "2",
        "title" : "Name3",
        "author" : "author2",
        "year" : "2020",
        "publisher" : "publisher",
        "pages" : "99",
        "instances" : "10"
    },
    {
        "id" : "3",
        "title" : "Name4",
        "author" : "author3",
        "year" : "2020",
        "publisher" : "publisher3",
        "pages" : "99",
        "instances" : "10"
    },
    {
        "id" : "4",
        "title" : "Name2",
        "author" : "author4",
        "year" : "2020",
        "publisher" : "publisher4",
        "pages" : "99",
        "instances" : "10"
    },
    {
        "id" : "5",
        "title" : "Name1",
        "author" : "author5",
        "year" : "2020",
        "publisher" : "publisher5",
        "pages" : "99",
        "instances" : "10"
    }
]

let $visitor = [
    {
        "id" : "1",
        "FIO" : "FIO1",
        "phone" : "phone1"
    },
    {
        "id" : "2",
        "FIO" : "FIO2",
        "phone" : "phone2"
    },
    {
        "id" : "3",
        "FIO" : "FIO3",
        "phone" : "phone3"
    },
    {
        "id" : "4",
        "FIO" : "FIO4",
        "phone" : "phone4"
    },
    {
        "id" : "5",
        "FIO" : "FIO5",
        "phone" : "phone5"
    }
]

let $card = [
    {
        "id" : "1",
        "id_visitor" : "5",
        "id_book" : "3",
        "date_from" : "01.01.2020",
        "date_to" : null
    },
    {
        "id" : "2",
        "id_visitor" : "4",
        "id_book" : "2",
        "date_from" : "01.01.2020",
        "date_to" : "01.04.2020"
    },
    {
        "id" : "3",
        "id_visitor" : "3",
        "id_book" : "1",
        "date_from" : "01.01.2020",
        "date_to" : null
    },
    {
        "id" : "4",
        "id_visitor" : "2",
        "id_book" : "4",
        "date_from" : "01.01.2020",
        "date_to" : "01.05.2020"
    },
    {
        "id" : "5",
        "id_visitor" : "1",
        "id_book" : "5",
        "date_from" : "01.01.2020",
        "date_to" : null
    }
]

let $header = $('#header')
let $new = $('#new')
let $links = $('a')
let $tableHead = $('#tableHead')
let $tableBody = $('tbody')
let $visitorName, $bookTitle
let $books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : []
let $visitors = localStorage.getItem('visitors') ? JSON.parse(localStorage.getItem('visitors')) : []
let $cards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : []
let $select = $('select')
let $sort = $('#sort')
let $popup = $('#popup')

$(document).ready(function($) {
    localStorage.setItem("books", JSON.stringify($book));
    localStorage.setItem("visitors", JSON.stringify($visitor));
    localStorage.setItem("cards", JSON.stringify($card));

    $fillPageBooks()

    $links.click(function () {
        let $activePage = $('.nav-item.active')
        $links.removeClass('active')
        $(this).addClass('active')
        $(this).append($('.sr-only'))
        if ($(this).text() === 'Books(current)' && ($activePage.text() !== 'Books(current)'))  {
            $fillPageBooks()
        }
        else if ($(this).text() === 'Visitors(current)' && ($activePage.text() !== 'Visitors(current)')) {
            $fillPageVisitors()
        }
        else if ($(this).text() === 'Cards(current)' && ($activePage.text() !== 'Cards(current)')) {
            $fillPageCards()
        }
        else if ($(this).text() === 'Statistics(current)' && ($activePage.text() !== 'Statistics(current)')) {
        }
    })

    $sort.click(() => {
    })

    $new.click(function () {
        $popup.empty()
        let $page = $('.nav-item.active')
        if ($page.text() === 'Books(current)') {
            let $newBook = '<h5>New book:</h5><label>Title<input></label><label>Author<input></label>' +
                '<label>Year<input></label><label>Publisher<input></label><label>Pages<input></label>' +
                '<label>Instances<input></label><button id="save">Save</button>'
            $popup.append($newBook)
        }
        $('#fade').fadeIn();
    })

    $('#save').click(function() {
        $('#fade').fadeOut();
        return false;
    })

    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('#fade').fadeOut();
        }
    });

    $('#fade').click(function(e) {
        if ($(e.target).closest('#popup').length === 0) {
            $(this).fadeOut();
        }
    })
})

function $fillPageBooks() {
        $header.text('ALL BOOKS')
        $new.text('New book')
        $fillBooks()
}

function $fillPageVisitors() {
    $header.text('ALL VISITORS')
    $new.text('New visitor')
    $fillVisitors()
}

function $fillPageCards() {
    $header.text('ALL CARDS')
    $new.text('New card')
    $fillCards()
}

function $fillPageStatistics() {

}

function $fillBooks() {
    $tableHead.empty()
    $tableBody.empty()
    $select.empty()
    $tableHead.append('<th scope="col">id</th><th scope="col">Title</th><th scope="col">Author</th>' +
        '<th scope="col">Year</th><th scope="col">Publisher</th><th scope="col">Pages</th>' +
        '<th scope="col">Instances</th><th scope="col">Edit</th><th scope="col">Delete</th>')
    for (let i = 0; i < $books.length; i++) {
        let $trBook = $tableBody.append('<tr>')
        let $htmlBook = '<td>' + $books[i].id + '</td>'
        $htmlBook += '<td>' + $books[i].title + '</td>'
        $htmlBook += '<td>' + $books[i].author + '</td>'
        $htmlBook += '<td>' + $books[i].year + '</td>'
        $htmlBook += '<td>' + $books[i].publisher + '</td>'
        $htmlBook += '<td>' + $books[i].pages + '</td>'
        $htmlBook += '<td>' + $books[i].instances + '</td>'
        $htmlBook += '<td><img src="https://img.icons8.com/small/20/000000/multi-edit.png"/></td>'
        $htmlBook += '<td><img src="https://img.icons8.com/material/20/000000/delete-forever--v2.png"/></td>'
        $trBook.append($htmlBook)
    }
    $select.append('<option>Title</option><option>Author</option><option>Instances</option>')
}

function $fillVisitors() {
    $tableHead.empty()
    $tableBody.empty()
    $select.empty()
    $tableHead.append('<th scope="col">id</th><th scope="col">Name</th><th scope="col">Phone</th><th scope="col">Edit</th>')
    for (let i = 0; i < $visitors.length; i++) {
        let $trVisitor = $tableBody.append('<tr>')
        let $htmlVisitor = '<td>' + $visitors[i].id + '</td>'
        $htmlVisitor += '<td>' + $visitors[i].name + '</td>'
        $htmlVisitor += '<td>' + $visitors[i].phone + '</td>'
        $htmlVisitor += '<td><img src="https://img.icons8.com/small/20/000000/multi-edit.png"/></td>'
        $trVisitor.append($htmlVisitor)
    }
    $select.append('<option>Id</option><option>Name</option>')
}

function $fillCards() {
    $tableHead.empty()
    $tableBody.empty()
    $select.empty()
    $tableHead.append('<th scope="col">id</th><th scope="col">Visitor</th><th scope="col">Book</th>' +
        '<th scope="col">Borrow Date</th><th scope="col">Return Date</th>')
    for (let i = 0; i < $cards.length; i++) {
        let $trCard = $tableBody.append('<tr>')
        let $htmlCard = '<td>' + $cards[i].id + '</td>'
        let $idVisitor =  $cards[i].id_visitor
        let $idBook =  $cards[i].id_book
        for (let i = 0; i < $visitors.length; i++) {
            if ($visitors[i].id === $idVisitor) {
                $visitorName = $visitors[i].FIO
            }
        }
        $htmlCard += '<td>' + $visitorName + '</td>'
        for (let i = 0; i < $books.length; i++) {
            if ($books[i].id === $idBook) {
                $bookTitle = $books[i].title
            }
        }
        $htmlCard += '<td>' + $bookTitle + '</td>'
        $htmlCard += '<td>' + $card[i].date_from + '</td>'
        $htmlCard += '<td>' + $card[i].date_to + '</td>'
        $trCard.append($htmlCard)
    }
    $select.append('<option>Borrow Date</option><option>Return Date</option>')
}

function $fillStatistics() {

}