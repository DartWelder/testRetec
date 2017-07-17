$(document).ready(() => {
    $('textarea').keydown((key) => {

        if (key.keyCode == 13) {
            event.preventDefault();
            $('.sendButton').click()

        }
    })

    let chat = $('.chat-window');

    let setScrollTop = function() {
        if ($(".message")[0]) {
            let index = $(".message").length - 1;
            let lastMessage = $(".message")[index]
            let top = lastMessage.offsetTop;
            $('.chat-window')[0].scrollTop = top;
        }
    }


    setInterval(setScrollTop, 200)

})