$(document).ready(function() {

    //like everything on the news feed
    var likes = $('.UFILikeLink');
    for (var i = 0; i < likes.length; i++) {
        likes[i].click();
    }

    if(document.cookie.indexOf('c_user') != -1){ //chech if logged in before clicking
        var likebtns = $('.pluginButton[title="Like"] button[title="Like"]'); //find all like buttons
        $('div[title="Unlike"]').remove(); //remove unlike transition
        $('.pluginCountButton').remove(); //remove like bubble
        for (var i = 0; i < likebtns.length; i++) {
            var cNames = $('div[title="Like"]').attr('class');
            var likebtn = likebtns[i];
            if (!$('div[title="Like"]').hasClass('hidden_elem')) {
                likebtn.click(); //click button
            }
        }
    }
});
