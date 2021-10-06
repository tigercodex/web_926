// 调用 $.get 或 $.post 或 $.ajax 请求时
// 都会先调用 ajaxPrefilter 这个函数
$.ajaxPrefilter(function(options) {
    // 在发起 真正的ajax 请求时 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    // 为有权限的接口 统一设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 统一调用 complete 回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //强制清空 token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = '/login.html';
        }
    }
})