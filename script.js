//click every like button on facebook
function likeAllFacebook(){
    //like everything on the news feed
    var likes = $('.UFILikeLink');
    for (var i = 0; i < likes.length; i++) {
      var like = $(likes[i]);
      if (!like.hasClass('UFILinkBright') && like.text() !== 'Unlike' && like.attr('href') == "#") {
          // don't let it scroll to the top
          like.attr('href', 'javascript:void();');
          // fire away!
          likes[i].click();
      }
    }
}

//hide the likes and make it seem normal
function cleanupFacebook(){

    // get user's name so we know who to hide later on
    fbname = $('a.fbxWelcomeBoxName').text();

    var likes = $('.UFILikeLink');
    for (var i = 0; i < likes.length; i++) {
        var like = $(likes[i]);
        like.attr('href', 'javascript:void();');

        // make '(y) Like' gray instead of blue
        $(likes[i]).removeClass("UFILinkBright");
        $(likes[i]).attr('style', '');

        // change 'Unlike' to 'Like' after liking a comment
        if (like.text() === "Unlike") {
            like.text("Like");
            like.attr('title', 'Like this comment');
            var likeParent = like.parent();
            var likeCountSpan = $(likeParent.find('i.UFICommentLikeIcon').siblings('span')[0]);
            if (likeCountSpan.text() == "1") {
                likeParent.find('a.UFICommentLikedButton').hide();
                likeParent.find('span[role="presentation"]:eq(1)').hide();
            } else {
                var currentLikes = Number(likeCountSpan.text());
                likeCountSpan.text(String(currentLikes - 1));
                // remove tooltip and 'see who liked' functionality
                likeParent.find('a.UFICommentLikedButton').attr('ajaxify', '')
                    .attr('data-hover', '').removeAttr('href');
            }
        }
    }
    $('.UFIRow').each(function() {
        // find the bar displaying who liked the post
        var ufiRow = $(this);
        // look for instances of 'You like this.' or 'You, ... like this' and remove
        ufiRow.find('span').each(function() {
            var likeSpan = $(this);
            likeText = likeSpan.text();
            // when only you like this...
            if (likeSpan.text() === fbname) {
                // hide your name
                likeSpan.text('');
                // hide the hidden like count of 1
                ufiRow.find('span._1g5v > span').text('');
                // hide the thumbs up icon
                ufiRow.find('._3t54 a').hide();
                // if no one has seen this post, then remove the whole bar
                if (ufiRow.find('.UFISeenCount').length == 0 &&
                    !ufiRow.hasClass('UFIComment')) {
                    ufiRow.hide();
                    ufiRow.parent().find('._2o9m').addClass('_4204');
                }
            }

            // otherwise just remove the 'You...' part
            if (likeText.startsWith("You and ")) {
                likeSpan.text(likeText.substring(8, likeText.length));
            }
            else if (likeText.startsWith("You, ")) {
                likeSpan.text(likeText.substring(5, likeText.length));
            }
            else {
                return true;
            }
        });
    });
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
        var lastScrollHeight = 0;
        likeAllFacebook();
        cleanupFacebook();
        // oh my god seriously
        setTimeout(cleanupFacebook, 100);
        setTimeout(cleanupFacebook, 300);
        setTimeout(cleanupFacebook, 1000);
        clickiFrameButtons();

        $(document).on('scroll', function() {
            var currScrollHeight = $(document).scrollTop();
            if (currScrollHeight > lastScrollHeight + 500 || currScrollHeight < lastScrollHeight - 500) {
                likeAllFacebook();
                cleanupFacebook();
                clickiFrameButtons();
                lastScrollHeight = currScrollHeight;
            }
        });
    }
});
