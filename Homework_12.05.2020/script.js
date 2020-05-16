$(document).ready(() => {
    const $body = $('body');
        const $btnArrow = $('.arrow');
        const $arrow = $('.leftArrow');
        const $left = $('.left');
        const $right = $('.right');
        const $leftTop = $('.left .top');
        const $leftBottom = $('.left .bottom');
        const $rightTop = $('.right .top');
        const $rightBottom = $('.right .bottom');
        const $leftSeparator = $('.left .separator');
        const $rightSeparator = $('.right .separator');
        let $leftUnlock = false;
        let $rightUnlock = false;
        let $maxHeight = $body.height();

        $btnArrow.click(function () {
            $left.toggleClass('display');
            $arrow.toggleClass('leftArrow');
            $arrow.toggleClass('rightArrow');
            if ($left.hasClass('display')) {
                $right.css('width', '99vw')
            }
            else {
                $right.css('width', '79vw')
            }
        })

        $(document).mousemove(function (event) {
            if ($leftUnlock) {
                let changeTop = $leftTop.height() - ($leftTop.height() - event.pageY);
                let changeBottom = $maxHeight - changeTop - $leftSeparator.height();
                if (changeTop <= 100) {
                    $leftTop.css('height', '100px');
                } else {
                    $leftTop.css('height', changeTop);
                }
                if (changeBottom <= 100) {
                    $leftBottom.css('height', '100px');
                    $leftTop.css('height', $maxHeight - $leftSeparator.height() - 100);
                } else {
                    $leftBottom.css('height', changeBottom);
                }
            }
            if ($rightUnlock) {
                let changeTop = $rightTop.height() - ($rightTop.height() - event.pageY);
                let changeBottom = $maxHeight - changeTop - $rightSeparator.height();
                if (changeTop <= 100) {
                    $rightTop.css('height', '100px');
                } else {
                    $rightTop.css('height', changeTop);
                }
                if (changeBottom <= 100) {
                    $rightBottom.css('height', '100px');
                    $rightTop.css('height', $maxHeight - $rightSeparator.height() - 100);
                } else {
                    $rightBottom.css('height', changeBottom);
                }
            }
        })

        $leftSeparator.mousedown(() => $leftUnlock = true)

        $rightSeparator.mousedown(() => $rightUnlock = true)

        $(document).mouseup(function () {
            $leftUnlock = false;
            $rightUnlock = false;
        })
    })

