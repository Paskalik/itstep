'use strict';

/* в процессе */
import {$fillBlocks} from './DOMBuilder.js'

$(document).ready(function() {
    $fillBlocks()
    $clickBlock()
    $clickBack()
})

let $indexRegion, $indexSchool

function $clickBlock() {
    $('.block').click(function () {
        if ($(this).attr('data-school')) {
            $indexRegion = $(this).attr('data-region')
            $indexSchool = $(this).attr('data-school')
            $fillBlocks($indexRegion, $indexSchool)
        }
        else if ($(this).attr('data-region')) {
            $indexRegion = $(this).attr('data-region')
            $fillBlocks($indexRegion)
        }
        $clickBlock()
    })

}

function $clickBack() {
    $('#back').click(function () {
        let $blocks =$('.blocks')
        if ($blocks.attr('data-region')) {
            $indexRegion = $blocks.attr('data-region')
            $fillBlocks($indexRegion)
        }
        else {
            $fillBlocks()
        }
        $clickBlock()
    })
}