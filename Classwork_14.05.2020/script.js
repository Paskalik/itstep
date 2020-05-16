const $nature = $('#nature');
const $cat = $('#cat');
$nature.mousemove(function(event) {
    let $catCoords = {
        top: event.pageY,
        left: event.pageX
    };
    if ($catCoords.top < 0) $catCoords.top = 0;
    if ($catCoords.left < 0) $catCoords.left = 0;
    if ($catCoords.left + $cat.width() > $nature.width()) {
        $catCoords.left = $nature.width() - $cat.width();
    }
    if ($catCoords.top + $cat.height() > $nature.height()) {
        $catCoords.top = $nature.height() - $cat.height();
    }
    $cat.css('left', $catCoords.left + 'px');
    $cat.css('top', $catCoords.top + 'px');
})