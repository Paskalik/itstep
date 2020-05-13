$().ready(() => {
    function str_rand() {
        const $q = $('#quantity');
        const $var = $('[type=checkbox]');
        let $res = '', $word = '';
        const $pattern =
            [
                '0123456789',
                'QWERTYUIOPASDFGHJKLZXCVBNM',
                'qwertyuiopasdfghjklzxcvbnm'
            ];
        $var.each((index,element) => {
            if (element.checked) {
                $word = $word + $pattern[index];
            }
        })
        let $max = $word.length - 1;
        for(let i = 0; i < $q.val(); ++i ) {
            let $position = Math.floor (Math.random() * $max);
            $res = $res + $word.substring($position, $position + 1);
        }
        return $res;
    }
    $('#gen').on('click',() => {
        $('#result').val(str_rand());
    });
})