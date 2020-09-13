$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 给上传按钮 绑定点击事件 模仿上传input框
    $('#fileBtn').on('click', function () {
        $('#file').click()
    })

    // 上传按钮带动 file文件上传点击事件后 给file绑定change事件获取需要的文件
    $('#file').on('change', function (e) {
        console.log(e);

        var fileList = e.target.files[0]
        if (fileList.length === 0) {
            return layer.msg('请上传图片')
        }

        //根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(fileList)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    /**
     * 给确定按钮绑定 点击事件
     */
    $('#btnUpload').click(function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        // 将图片信息提交给服务器
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('上传失败')
                }
                // layer.msg('上传成功')
                window.parent.getUserInfo()

            }
        })

    })



})