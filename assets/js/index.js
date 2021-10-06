$(function() {
    getUserInfo();


    //退出 按钮的绑定点击事件
    $('#btnLogout').on('click', function() {
        //提示用户是否退出登录
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            //1.清空本地存储
            localStorage.removeItem('token');
            //2.重新跳转登录页面
            location.href = '/login.html';
            //3.关闭询问框
            layer.close(index);
        });
    })
})



//获取用户信息的函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('身份认证失败');
            }
            //调用 渲染用户头像的函数
            renderAvater(res.data);
        },
        //不论 成功还是失败都会调用complete函数
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //强制清空 token
        //         localStorage.removeItem('token');
        //         // 跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}

// 渲染用户头像的函数
function renderAvater(user) {
    // 获取用户的名字
    var name = user.nickname || user.username;
    // 设置欢迎文字
    $('#welcome').html('欢迎你&nbsp' + name);
    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        // 渲染用户图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avater').hide();
    } else {
        // 渲染文字头像
        var first = name[0].toUpperCase();
        $('.layui-nav-img').hide();
        $('.text-avater').html(first).show();
    }
}