$(function () {

    var form = layui.form
    var layer = layui.layer
    /**
     * 表单验证
     */
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '请输入 1 ~ 6 个字符'
            }
        }
    })

    /**
     * 获取用户信息 并渲染
     */
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formInfo', res.data)
            }
        })
    
    }

    /**
     * 重置表单
     */
    $('#resetBtn').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    /**
     * 更新基本资料
     */
    $('#changeBtn').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })

    /**
     * 修改密码
     */





}) 