// 将所有公共部分的代码 或者 资源地址之类的 抽离出来 方便以后统一更改
    $.ajaxPrefilter(function (options) {
        console.log(options.url);
        
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        console.log(options.url);

    })