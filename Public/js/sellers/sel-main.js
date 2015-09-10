function setLayout() {
    var height = document.documentElement.clientHeight || document.body.clientHeight;
    var width = document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementById('mainWrap').style.height = height - 70 + 'px';
    document.getElementById('aside').style.height = height - 70 + 'px';
    document.getElementById('tableDetail').style.width = width - 240 + 'px';
}
setLayout();
tableStyle();
function tableStyle() {
    $('tr:odd').addClass('odd');
    $('tr:even').addClass('even');
}
$(document).bind('click', function(event) {
    if(event.target.id == 'del-add') {
        $('#class-detail').hide();
        $('#fr-add').hide();
        return false;
    }
    if(event.target.id == 'add-class') {
        $('#class-detail').show();
        $('#fr-add').show();
        return false;
    }
    if(event.target.id == 'mod') {
        $('#class-mod').show();
		$('#fr-mod').show();
        return false;
    }
    if(event.target.id == 'del-mod') {
        $('#class-mod').hide();
		$('#fr-mod').hide();
        return false;
    }
    if(event.target.className == "del") {
        confirm("确认删除?");
    }
}).bind('mouseover', function(event) {
    if(event.target.id == 'btn-add') {
    }
}); 
/*
    检查添加用户表单的验证
*/
function checkAdduser(){
    var userName  = document.adduserFrm.userName.value;
    var password1 = document.adduserFrm.password1.value;
    var password2 = document.adduserFrm.password2.value;

    //验证用户名，要求 1、不为空 2、长度为4-10位 3、首位必须是字母
    if( !/^[a-z|A-Z]\w{3,9}$/.test( userName ) ){
        alert("用户名要求首位必须是字母，且长度4-10位");
        document.adduserFrm.userName.focus();
        return false;
    }

    //验证密码，要求 1、长度8-16位 2、两次密码必须相同
    if( ( password1.length<8 || password1.length>16 )){
        alert("密码长度要求8-16位");
        document.adduserFrm.password1 = "";
        document.adduserFrm.password1.focus();
        return false;
    }
    if( ( password2.length<8 || password2.length>16 )){
        alert("密码长度要求8-16位");
        document.adduserFrm.password2 = "";
        document.adduserFrm.password2.focus();
        return false;
    }
    if( password1 != password2 ){
        alert("两次密码不一样，请自己检查");
        document.adduserFrm.password1 = "";
        document.adduserFrm.password2 = "";
        document.adduserFrm.password1.focus();
        return false;
    }
}
/*
    重置密码ajax
*/
function resetPwd(i){
    $.ajax({
        "type"     : "post",
        "url"      : URL+"/resetPwd",
        "data"     : "workroomId="+i,
        "dataType" : "html",
        "success"  : function(msg){
            if( msg ){
                alert("重置密码成功");
            }else{
                alert("重置密码失败");
            }
        }
    });
    
}
/*
    删除用户ajax
*/
function delUser(i){
    if(confirm('确定删除该用户？')){
        $.ajax({
            "type"     : "post",
            "url"      : URL+"/delUser",
            "data"     : "workroomId="+i,
            "dataType" : "html",
            "success"  : function(msg){
                if( msg ){
                    window.location.reload();
                    alert("删除用户成功");
                }else{
                    alert("删除用户失败");
                }
                //alert(msg);
            }
        });
    }
}
/*
    删除反馈ajax
*/
function delSuggest(i){
    if(confirm('确定删除此条反馈信息？')){
        $.ajax({
            "type"     : "post",
            "url"      : URL+"/delSuggest",
            "data"     : "id="+i,
            "dataType" : "html",
            "success"  : function(msg){
                if( msg ){
                    window.location.reload();
                    alert("删除信息成功");
                }else{
                    alert("删除信息失败");
                }
                // alert(msg);
            }
        });
    }
}
/*
    添加公告表单验证
*/
function checkAddNotice(){
    var title   = document.adduserFrm.title.value;
    var content = document.adduserFrm.content.value;
    if(title==""){
        alert("标题不能为空");
        document.adduserFrm.title.focus();
        return false;
    }
    if(content==""){
        alert("内容不能为空");
        document.adduserFrm.title.focus();
        return false;
    }
    
}

/*
    修改公告表单验证
*/
function checkModNotice(){
    var title   = document.modnoticeFrm.title.value;
    var content = document.modnoticeFrm.content.value;
    if(title==""){
        alert("标题不能为空");
        document.modnoticeFrm.title.focus();
        return false;
    }
    if(content==""){
        alert("内容不能为空");
        document.modnoticeFrm.title.focus();
        return false;
    }
}
/*
    删除公告ajax
*/
function delNotice(i){
    if(confirm('确定删除此条公告？')){
        $.ajax({
            "type"     : "post",
            "url"      : URL+"/delNotice",
            "data"     : "id="+i,
            "dataType" : "html",
            "success"  : function(msg){
                if( msg ){
                    window.location.reload();
                    alert("删除公告成功");
                }else{
                    alert("删除公告失败");
                }
                //alert(msg);
            }
        });
    }
}
/*
    审核ajax
*/
function audit(messageId,i){
    $.ajax({
        "type"     : "post",
        "url"      : URL+"/audit",
        "data"     : "messageId="+messageId+"&is_ok="+i,
        "dataType" : "html",
        "success"  : function(msg){
            if( msg ){
                window.location = URL+"/index";
                alert("审核结果成功");
            }else{
                window.location = URL+"/index";
                alert("审核失败");
            }
            //alert(msg);
        }
    });
}
/*
    删除班级ajax
*/
function delClass(i){
    if(confirm('确定删除该班级？')){
        $.ajax({
            "type"     : "post",
            "url"      : URL+"/delNotice",
            "data"     : "id="+i,
            "dataType" : "html",
            "success"  : function(msg){
                if( msg ){
                    window.location.reload();
                    alert("删除公告成功");
                }else{
                    alert("删除公告失败");
                }
                //alert(msg);
            }
        });
    }
}