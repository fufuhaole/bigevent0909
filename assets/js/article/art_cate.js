$(function () {
    var layer = layui.layer
    var form = layui.form
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
    $('body').on('submit', '#formAdd', function (e) {
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

    /**
     * 编辑文章分类
     */
    var indexEdit = null
    $('tbody').on('click', '.btnEdit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改类别',
            content: $('#editdialog').html()
        });

        // 获取点击的当前行的自定义属性 data-id 
        var cateId = $(this).attr('data-id')

        // 将页面的内容渲染到编辑框
        $.ajax({
            url: `/my/article/cates/${cateId}`,
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('edit-form', res.data)
            }
        })
    })

    // 给动态生成的弹出框form表单 绑定submit事件
    $('body').on('submit', '#formEdit', function (e) {
        e.preventDefault()

        //将修改后的内容发送到服务器
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    
                    return layer.msg(res.message)
                }
                layer.msg('内容修改成功')

                // 将更新后的数据进行渲染
                getCateList()

                //关闭 弹出框
                layer.close(indexEdit)
            }
        })
    })

    /**
     * 删除文章分类
     */
    $('tbody').on('click', '.btn-delete', function () {
        // 获取点击删除的当前行id
        var id = $(this).attr('data-id')

        // 弹出询问框
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url: `/my/article/deletecate/${id}`,
                method: 'GET',
                success: function (res) {
                    if (res.status !== 0) {
                        console.log(res);
                        
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    getCateList()
                    layer.close(index);

                }
            })
            
          });
    })

})