$(function() {
    $('#log-in').submit(function() {
        $.ajax({
            type: 'POST',
            url: 'text.js',
            dataType: 'text',
            suceess: function() {
                if(msg === '用户名不存在') {
                    $('input [name="userName"]').after('<span class="wrong">用户不存在</span>');
                } else if(msg === '密码') {
                    $('input [name="password"]').after('<span class="wrong">密码错误</span>');
                } else {
                    //跳转页面
                }
            }
        });
    });
});