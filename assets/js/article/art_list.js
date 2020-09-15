$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 声明查询参数
    var q = {
        pagenum: 1, //当前的页码值 默认的的初始页面
        pagesize: 2, //每页显示的条数 设置默认为2
        cate_id: '', //文章分类的 Id
        state: '' //	文章的状态，可选值有：已发布、草稿
    }

    /**
     * 获取文章列表
     */
    iniTatble()
    initCate()

    function iniTatble() {
        $.ajax({
            url: '/my/article/list',
            method: 'GET',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);

                    return layer.msg(res.message)
                }
                var tableHtml = template('tpl-table', res)
                $('tbody').html(tableHtml)

                renderPage(res.total)
            }
        })
    }

    /**
     * 定义美化时间的过滤器
     */
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    /**
     * 渲染下拉列表中的所有分类
     */

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var cateHtml = template('tpl-cate', res)
                $('.layui-form [name=cate_id]').html(cateHtml)
                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }

    /**
     * 筛选按钮绑定事件
     */
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        // console.log(cate_id);
        // console.log(state);
        
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        iniTatble()
    })


    /**
     * 分页处理函数
     */
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 renderPage 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            layout: ['count', 'limit', 'page', 'prev', 'next', 'skip'],
            limits: [2, 5, 10, 15],
            jump: function (obj, first) {
                // console.log(obj);
                q.pagenum = obj.curr
                
                q.pagesize = obj.limit
                // 可以通过第二个参数 对调用jump的回调函数进行判断
                if (!first) {
                    iniTatble()
                }
            }
        });
    }
    
    /**
     * 删除列表文章
     */
    $('tbody').on('click', '.delete-btn', function () {
        // console.log($(this).attr('data-id'));
        //获取自定义属性对应的 id值
        var BtnId = $(this).attr('data-id')
        var len = $('.delete-btn').length
        console.log(len);
        
        // 点击后弹出layui弹出层
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //对接服务器后台删除接口
            $.ajax({
                url: '/my/article/delete/' + BtnId,
                method: 'GET',
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除文章成功')
                // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                // 如果没有剩余的数据了,则让页码值 -1 之后,
                // 再重新调用 initTable 方法
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1? 1 : q.pagenum - 1
                    }
                    iniTatble()
                    layer.close(index);
                }
            })
          });
        
        
    })

})