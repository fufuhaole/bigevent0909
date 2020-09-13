$(function () {
    var layer = layui.layer

    /**
     * 获取服务器信息 并用模板引擎渲染
     */
    getCateList()
    function getCateList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }      
                
                
                // 成功获取获取后 利用模板引擎渲染页面
                var tableHtml = template('dialog-add', res)
                $('tbody').html(tableHtml)
            }
        })
    }

    /**
     * 添加类别弹框
     */
    var indexAdd = null
    $('#artBtnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加类别',
            content: $('#adddialog').html()
          });  
    })

    /**
     * 添加文章类别
     */
    // 因为是后期生成的结构 所以要使用事件委托
    $('body').on('submit', '#formAdd' ,function (e) {
        // 关闭默认事件
        e.preventDefault()
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                getCateList()
                
                layer.close(indexAdd)
            }
        })

    })

})