$(document).ready(function() {

    //like everything on the news feed
    var likes = $('.UFILikeLink');
    for (var i = 0; i < likes.length; i++) {
        var like = $(likes[i]);
        likes[i].click();
        likes[i].className = "UFILikeLink";
        like.find('i').removeClass('sx_500eea').addClass('sx_e0a7f7');
        var ufiRow = like.parent().parent().parent().parent().find('.UFIRow');
        // find the bar displaying who liked the post and the 'seen count'
        var ufiLikeSentenceText = ufiRow.find('.UFILikeSentenceText');
        // look for instances of 'You like this.' or 'You, ... like this' and remove
        console.log('UFILIKESENTENCETEXT');
        console.log(ufiLikeSentenceText);
        ufiLikeSentenceText.find('span').each(function() {
            console.log($(this));
            if ($(this).text() === "You like this.") {
                $(this).remove();
                console.log('UFISeenCount');
                console.log(ufiLikeSentenceText.find('.UFISeenCount');
                if (ufiLikeSentenceText.find('.UFISeenCount').length > 0) {
                    ufiLikeSentenceText.find('.UFISeenCountRight').removeClass('UFISeenCountRight');
                    ufiLikeSentenceText.find('.rfloat').removeClass('.rfloat');
                } else {
                    ufiLikeSentenceText.remove();
                }
            }
            if ($(this).text() === "You like this." || $(this).text() === "You, " || $(this).text() === "You and ") {
                $(this).remove();
            }
        });
        if (ufiRow.find('UFISeenCount').length > 0) {
            
        }
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
