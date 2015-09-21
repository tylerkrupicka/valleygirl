$(document).ready(function() {

    //like everything on the news feed
    var likes = $('.UFILikeLink');
    console.log(likes);
    console.log('----------------------');
    for (var i = 0; i < likes.length; i++) {
        var like = $(likes[i]);
        console.log(like);
        likes[i].click();
        likes[i].className = "UFILikeLink";
        like.find('i').removeClass('sx_500eea').addClass('sx_e0a7f7');
    }

    if(document.cookie.indexOf('c_user') != -1){ //chech if logged in before clicking
        var likebtns = $('.pluginButton[title="Like"] button[title="Like"]'); //find all like buttons
        $('div[title="Unlike"]').remove(); //remove unlike transition
        $('.pluginCountButton').remove(); //remove like bubble
        $('._5jjm').parent().remove();
        for (var i = 0; i < likebtns.length; i++) {
            var cNames = $('div[title="Like"]').attr('class');
            var likebtn = likebtns[i];
            if (!$('div[title="Like"]').hasClass('hidden_elem')) {
                likebtn.click();
            }
        }
    }
});
