$(function() {
    // 为右下角登录添加点击事件
    $('#login').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()

    })

    // 为右下角注册添加点击事件
    $('#regist').on('click', function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //从 layui 中获取form 对象 layer 对象
    var form = layui.form;
    var layer = layui.layer;
    //自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码校验
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })

    // 表单的数据的post请求
    //监听表单的提交事件
    $('#reg-form').on('submit', function(e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        //发起post请求
        var data = { username: $('#reg-form [name=username]').val(), password: $('#reg-form [name=password]').val() }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录');
                // 模拟人的点击事件 跳转到登录页面
                $('#regist').click();
            }
        )
    })


    //监听登录表单的提交事件
    $('#login-form').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        //发起Ajax 请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登陆成功的 token 字符串 ，保存到 localStorage中
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
})