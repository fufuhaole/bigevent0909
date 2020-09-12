$(function () {

    var form = layui.form
    var layer = layui.layer
    form.verify({
        oldpwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'],
        newpwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }

    })

    /**
     * 修改密码
     */
    $('#changemm').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败！')
                }
                layui.layer.msg('更新密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
                top.window.location.href = '/login.html'
            }
        })
    })
})
