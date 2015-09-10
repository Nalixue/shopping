$(document).bind('click', function(event) {

    if(event.target.id == 'login') {
        $('#pop-login').show();
    }

    if(event.target.id == 'icon-cross') {
        $('#pop-login').hide();
    }

    if(event.target.id == 'top') {
        $(this).scrollTop(0);
    }

    if(event.target.className == 'local') {
        document.getElementById('ture-local').innerHTML = event.target.innerHTML;
    }
    var shopNum = $('#shop-num').val();

    if(event.target.id == 'add-num') {
        $('#shop-num').val(++ shopNum);   
    }

    if(event.target.id == 'reduce-num') {
        if(shopNum != 1) {
            $('#shop-num').val(-- shopNum);
        } 
    }

    if(event.target.id == 'btn-review') {
        $('#show-detail').hide();
        $('#review').show();
        return false;
    }

    if(event.target.id == 'btn-shop') {
        $('#review').hide();
        $('#show-detail').show();
        return false;
    }
}).bind('keyup', function(event) {

    if(event.target.id == 'search' && event.keyCode == 13) {
        $('#form-sear').submit();
    }
}).bind('scroll', function() {
    if($(this).scrollTop() !== 0) {
        $('#top').show();
    } else {  
        $('#top').hide();
    }
});


$(function() {

    $(document).delegate('.add-num', 'click', function() {
            var shopNum = $(this).prev();
            var shopNumVal = shopNum.val();
            var perNum = $(this).parent().prev().html();

            shopNum.val(++ shopNumVal);
            $(this).parent().next().html((shopNumVal * perNum).toFixed(2));
            $('#all-price').html('￥' + sumPrice());
            event.preventDefault();

    }).delegate('.reduce-num', 'click', function(event) {
        var shopNum = $(this).next();
        var shopNumVal = shopNum.val();
        var perNum = $(this).parent().prev().html();

        if(shopNumVal != 1) {
            shopNum.val(-- shopNumVal);
            $(this).parent().next().html((shopNumVal * perNum).toFixed(2));
            $('#all-price').html('￥' + sumPrice());
        }
        event.preventDefault();

    }).delegate('#btn-submit', 'click', function(event) {

        if( $('#all-price').html() != '￥0.00') {
            $('#sure-buy').show();
            $('#sure-form').show();
            setData();
        } else {
            $(this).parent().after('<p class="not-buy">您未选择任何商品</p>');
        }       
        event.preventDefault();

    }).delegate('.tr-num', 'keyup', function() {

        if(/\d/.test( $(this).val() ) ) {
            console.log('da');
            var perNum = $(this).parent().prev().html();
            var allPrice = ($(this).val() * perNum).toFixed(2);
            $(this).parent().next().html(allPrice);
            $('#all-price').html('￥' + sumPrice());
        } else {
            $(this).val(1);
        }

    }).delegate('input[type="checkbox"]', 'click', function() {        
        $('#all-price').html('￥' + sumPrice());

    }).delegate('#child-img img', 'click', function() {
        var imgSrc = $(this).attr('src');
        $('#par-img').attr('src', imgSrc);
    });

    function sumPrice() {
        var allPrice = 0;
        $('input[type="checkbox"]:checked').each(function() {

            var price = $(this).next().next().next().next().next().html();
            allPrice += parseInt(price);
        });

        return allPrice.toFixed(2);
    }

    function setData() {
        var id = [];
        var num = [];

        $('input[type="checkbox"]:checked').each(function() {
            //在input传给后台所需数据
            var idVal = $(this).val();
            var perPrice = $(this).next().next().next().next().find('input').val();
            var allPrice = $('#all-price').html();

            id.push(idVal);
            num.push(perPrice);
            $('input[name="buy-id"]').val(id);
            $('input[name="buy-count"]').val(num);
            $('input[name="buy-total"]').val(allPrice.match(/\d{1,}/));
        });
    }
});
