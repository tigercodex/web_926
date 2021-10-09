$(function() {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称的长度不能大于6位';
            }
        }
    })
    initUserInfo();

    //获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                // console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }


    // 为重置按钮绑定点击事件
    $('#btnReset').on('click', function(e) {
        //阻止重置的默认行为
        e.preventDefault();
        initUserInfo();
    })




    //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        //发起Ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改信息失败！');
                }
                layer.msg('修改信息成功！');

                //调用父页面的渲染用户头像的方法
                window.parent.getUserInfo();
            }
        })
    })
})