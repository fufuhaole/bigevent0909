$(function () {
    $('.link-login').on('click', function () {
        $('.regBox').hide()
        $('.loginBox').show()
    })
    $('.link-reg').on('click', function () {
        $('.regBox').show()
        $('.loginBox').hide()
    })
})