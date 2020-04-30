'use strict';
let input = document.getElementById('fio');
input.onblur = () => {
    let data = input.value.split(' ');
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i][0].toUpperCase() + data[i].slice(1);
    }
    input.value = data.join(' ');
}