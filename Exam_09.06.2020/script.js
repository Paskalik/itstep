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
            $popupBook()
            $('#save').click(function() {
                    if ($saveBook()) {
                        $('#fade').fadeOut();
                        $books = localStorage.getItem('books') ? JSON.parse(localStorage.getItem('books')) : []
                        $fillPageBooks()
                        return false;
                    }
            })
        }
        else if ($page.text() === 'Visitors(current)') {
            $popupVisitor()
            $('#save').click(function() {
                if ($saveVisitor()) {
                    $('#fade').fadeOut();
                    $visitors = localStorage.getItem('visitors') ? JSON.parse(localStorage.getItem('visitors')) : []
                    $fillPageVisitors()
                    return false;
                }
            })
        }
        else if ($page.text() === 'Cards(current)') {
            $popupCard()
            $('#save').click(function() {
                if ($saveCard()) {
                    $('#fade').fadeOut();
                    $cards = localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) : []
                    $fillPageCards()
                    return false;
                }
            })
        }
        $('#fade').fadeIn();
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
        $htmlBook += '<td><img src="https://img.icons8.com/small/20/000000/multi-edit.png" alt="edit"/></td>'
        $htmlBook += '<td><img src="https://img.icons8.com/material/20/000000/delete-forever--v2.png" alt="delete"/></td>'
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
        $htmlVisitor += '<td><img src="https://img.icons8.com/small/20/000000/multi-edit.png" alt="edit"/></td>'
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

function $popupBook() {
    let $newBook = '<h5>New book:</h5><label>Title<input type="text"><span class="error"></span></label>' +
        '<label>Author<input type="text"><span class="error"></span></label><label>Year<input type="number">' +
        '<span class="error"></span></label><label>Publisher<input type="text"><span class="error"></span></label>' +
        '<label>Pages<input type="number"><span class="error"></span></label><label>Instances<input type="number">' +
        '<span class="error"></span></label><button id="save">Save</button>'
    $popup.append($newBook)
}

function $popupVisitor() {
    let $newVisitor = '<h5>New visitor:</h5><label>Full name<input type="text"><span class="error"></span></label>' +
        '<label>Phone number<input type="text" class="phone"><span class="error"></span></label><button id="save">Save</button>'
    $popup.append($newVisitor)
}

function $popupCard() {
    let $newCard = '<h5>New card:</h5><label>Visitor<select></select><span class="error"></span></label>' +
        '<label>Book<select></select><span class="error"></span></label><button id="save">Save</button>'
    $popup.append($newCard)

}

function $saveBook() {
    let $inputBook = $('#popup').find('input')
    let $newId = JSON.parse(localStorage.getItem('books')).length + 1
    if ($validateData($inputBook)) {
        let $newBook = {
            "id": $newId,
            "title": $inputBook[0].value,
            "author": $inputBook[1].value,
            "year": $inputBook[2].value,
            "publisher": $inputBook[3].value,
            "pages": $inputBook[4].value,
            "instances": $inputBook[5].value
        }
        let $item = JSON.parse(localStorage.getItem("books"))
        $item.push($newBook)
        delete localStorage["books"]
        localStorage["books"] = JSON.stringify($item)
        return true;
    }
    else return false;
}

function $saveVisitor() {
    let $inputVisitor = $('#popup').find('input')
    let $newId = JSON.parse(localStorage.getItem('visitors')).length + 1
    if ($validateData($inputVisitor)) {
        let $newVisitor = {
            "id": $newId,
            "name": $inputVisitor[0].value,
            "phone": $inputVisitor[1].value
        }
        let $item = JSON.parse(localStorage.getItem("visitors"))
        $item.push($newVisitor)
        delete localStorage["visitors"]
        localStorage["visitors"] = JSON.stringify($item)
        return true;
    }
    else return false;
}

function $saveCard() {
    let $inputCard = $('#popup').find('input')
    let $newId = JSON.parse(localStorage.getItem('cards')).length + 1
    if ($validateData($inputCard)) {
        let $newCard = {
            "id": $newId,
            "name": $inputCard[0].value,
            "phone": $inputCard[1].value
        }
        let $item = JSON.parse(localStorage.getItem("cards"))
        $item.push($newCard)
        delete localStorage["cards"]
        localStorage["cards"] = JSON.stringify($item)
        return true;
    }
    else return false;
}

function $validateData($inputArr) {
    let $error = $('.error')
    let $count = 0
    $error.css('color','red')
    let $result
    for (let i = 0; i < $inputArr.length; i++) {
        if ($inputArr[i].value === "") {
            $error[i].textContent = 'Field required!'
        } else if (($inputArr[i].type === 'number') && ($inputArr[i].value < 0)) {
            $error[i].textContent =  'Only positive!'
        } else if (($inputArr[i].className === 'phone')&& (!$inputArr[i].value.match(/^[\d\s\-]{2,}$/g))) {
            $error[i].textContent =  'Incorrect phone number!'
        } else {
            $error[i].textContent = ""
            $count++
        }
    }
    $result = $count === $inputArr.length;
    return $result;
}