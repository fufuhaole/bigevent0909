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
    
    var layer = layui.layer
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


    //注册功能
    $('#form-reg').on('submit', function (e) {
        // console.log(e);
        e.preventDefault()
        $.post('/api/reguser', {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=username]').val()
        }, function (res) {
            console.log(res);
            
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('.link-reg').click()
        })
        
    })

    //登录功能
    $('#form-login').submit(function (e) {

        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功')
                console.log(res);
                
                // 将token保存到本地
                localStorage.setItem('token', res.token)

                // 跳转主页
                location.href = '/index.html'

            }
        })

    })

})

