// 调用 $.get 或 $.post 或 $.ajax 请求时
// 都会先调用 ajaxPrefilter 这个函数
$.ajaxPrefilter(function(options) {
    // 在发起 真正的ajax 请求时 统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})