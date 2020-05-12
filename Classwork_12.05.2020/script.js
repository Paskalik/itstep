$('button').click(function () {
    const $p = $('p');
    $p.toggleClass('click');
})

const $list = $('li');

$list.each((index,element) => {
    console.log((index + 1) + '.' + $(element).text());
})