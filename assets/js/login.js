$(function () {
    $('.link-login').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('.link-reg').on('click', function () {
        $('.loginBox').show()
        $('.regBox').hide()
    })

    // 用户名密码正则验证
    var form = layui.form
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repass: function (value) {
            var password = $('.regBox [name=password]').val()
            if (value !== password) {
                return "两次密码不一致"
            }    
        }
    })


})

