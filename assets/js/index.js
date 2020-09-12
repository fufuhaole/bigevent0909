$(function () {

    getUserInfo()

    // 给退出点击事件 定义函数
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确认是否退出', {icon: 3, title:'提示'}, function(index){
            //do something
            // console.log(index);
            // 网页跳转到登录页面
            location.href = '/login.html'
            
            // 跳转同时清除本地储存的token
            localStorage.removeItem('token')
            
            // 关闭询问框
            layer.close(index);
        });

    })
})

var layer = layui.layer

// 定义获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        /**
         * 因为很接口的权限需设置headers的请求头 所以抽离处理放在ajaxPrefilter
         * 这个函数中
         */
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            //如果获取失败 直接返回res.message
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 如果获取成功的话 进行渲染头部头像
            renderAvatar(res.data)
        },
        // complete 无论访问成功还是失败都会调用的方法
        complete: function (res) {
            console.log(res);
            // 对res 返回的对象进行判断
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1 强制返回登录页面
                location.href = '/login.html'
                // 2 清除本地token
                localStorage.removeItem('token')
            }
        }
    })
}

// 定义渲染头部的函数
function renderAvatar(user) {
    console.log(user);
    // 对用户的是否有昵称进行判断 如果有 则用昵称 没有则用username
    var name = user.nickname || user.username
    // 渲染 欢迎用户部分
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 渲染头像部分 对头像进行判断 如果上传过头像 则用上传的头像 否则用另一个
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // var first = name[0].toUpperCase()
        var first = name[0]
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }

}


