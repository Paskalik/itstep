import Products from './Products.js';
import Basket from './Basket.js';
import DataBase from './DataBase.js';
import Admin from "./Admin.js";

(function($) {
    $(document).ready(() => {
        localStorage.clear()
        const $products = new Products;
        const $basket = new Basket;
        const $db = new DataBase;
        const $admin = new Admin;
        const $section = $('section');

        //listen the nav button "Products"
        $('.product').click(function () {
            setActiveButton($(this));
            setProductPage();
        });

        //listen the nav button "Basket"
        $('.basket').click(function () {
            setActiveButton($(this));
            setBasketPage();
        });

        //listen the nav button "Admin page"
        $('.admin').click(function () {

            setActiveButton($(this));
            setAdminPage();
        });


        function setActiveButton(element) {

            //check if current button is active
            if(element.hasClass('active')) return;

            //clear active button
            $('.active').removeClass('active');

            //set new active button
            element.addClass('active');
            $section.empty();
        }

        function setBasketPage() {
            $basket.setTitle($section);
            if(localStorage.length === 1) return;
            $basket.setTableHeader($section);
            let $arr, $acc = 1, $totalSum = 0;
            for(let i = 0; i < localStorage.length; i++){
                if (localStorage.key(i) !== 'products') {
                    $arr = localStorage.getItem(localStorage.key(i)).split(',');
                    $basket.setItems(
                        $acc, //item row number
                        `${$arr[0]}(${$arr[1]})`, //title and country
                        $arr[2], //price
                        $arr[3], //current quantity
                        $arr[4] //max quantity
                    );
                    $acc++;
                    $totalSum = $totalSum + (+$arr[3] * (+$arr[2]));
                    if (i === localStorage.length - 1) $basket.setTotal($totalSum);
                }
            }

            //listen quantity
            let $elCount = $('input[type="number"]');

            //clear invalid class from input on focusing
            $elCount.focus(function () {$(this).removeClass('invalid');});

            //change quantity
            $elCount.change(function () {

                let $total = 0;

                // check available quantity
                if(+$(this).val() > +$(this).data('count')) return $(this).addClass('invalid');
                // set total sum of current row
                $('.price').eq(+$(this).data('num')-1).text(((+$(this).val())*(+$(this).data('price'))).toFixed(2));

                // set total sum of the basket
                $('.row').each(function(){
                    $total = +$total+(+$(this).text());
                });
                $('.sum').text((+$total).toFixed(2));
            })
        }

        function setProductPage() {
            //build page and listen elements
            $products.setTitle($section);

            $db.getData().forEach((e, id)=>{
                if(e.count > 0)$products.setItems(id, e.title, e.image, e.country, e.price, e.count);
            });

            //clear invalid class from input on focusing
            $('.counter').focus(function () {$(this).removeClass('invalid');});

            //listen the button "Buy"
            let $ident, $maxCount, $elCount;
            $('input[type="button"]').click(function () {

                $ident = $(this).data('num');
                $maxCount = $(this).data('count');
                $elCount = $(`#${$ident} .counter`);

                // check max count
                if(+$elCount.val() > $maxCount || +$elCount.val() < 1) return $elCount.addClass('invalid');

                //save to local storage
                localStorage.setItem($ident,
                    $(`#${$ident} .item`).text() + ',' + // title of item
                    $(`#${$ident} .country`).text()+ ',' + // country
                    $(`#${$ident} .price`).text()+ ',' + // price
                    $elCount.val() + ',' + // current quantity
                    $maxCount // max quantity
                );
            });
        }
        
        function setAdminPage() {
            let $data = $db.getData()
            console.log($data)
            let $index = 0, $type
            $admin.setTitle($section)
            $admin.setTableHeader()
            $data.forEach((e, id) => {
                if(e.count > 0) $admin.setItems(id + 1, e.title, e.image, e.country, e.count, e.price);
            });
            $admin.setButton($section)
            $admin.setPopup($section)

            $('.edit').click(function () {
                $('#fade').fadeIn()
                $data.forEach((el) => {
                    if (el['title'] === $(this).data('name')) {
                        $admin.setInfoPopup(el.title,el.image,el.country,el.count,el.price)
                        $index = $data.indexOf(el)
                    }
                })
                $type = 'edit'
            })

            $('#save').click(() => {
                let $elCount = $('.popup input')
                let $count = 0
                $elCount.focus(function () {
                    $(this).removeClass('invalid')
                })
                for (let i = 0; i < $elCount.length - 1; i++) {
                    if (($elCount[i].type = 'text') && ($elCount[i].value === '')) {
                        $elCount[i].classList.add('invalid')
                        $count++
                    }
                    else {
                        if (($elCount[i].type = 'number') && ($elCount[i].value < 0)) {
                            $elCount[i].classList.add('invalid')
                            $count++
                        }
                    }
                }
                if ($count === 0) {
                    let $newFruit = $admin.newItem()
                    if ($type === 'edit') {
                        $data[$index] = $newFruit
                    }
                    else if ($type === 'add') {
                        $data.push($newFruit)
                    }
                    localStorage.setItem('products', JSON.stringify($data))
                    $('#fade').fadeOut()
                    $section.empty()
                    setAdminPage()
                }
            })

            $('.remove').click(function () {
                $data.forEach((el) => {
                    if (el['title'] === $(this).data('name')) {
                        $index = $data.indexOf(el)
                    }
                })
                $data.splice($index,1)
                localStorage.setItem('products',JSON.stringify($data))
                $section.empty()
                setAdminPage()

            })

            $('#new').click(function () {
                $('#fade').fadeIn()
                $type = 'add'
            })

            $(document).keydown(function(e) {
                if (e.keyCode === 27) {
                    e.stopPropagation();
                    $('#fade').fadeOut($admin.clearInfoPopUp());
                }
            });

            $('#fade').click(function(e) {
                if ($(e.target).closest('#popup').length === 0) {
                    $(this).fadeOut($admin.clearInfoPopUp());
                }
            })
        }

        //fulfill localStorage
        $db.setData()

        //set start page
        setProductPage();
    });
})(jQuery);