var imageSheetClass = '';
var likeClass = '';

function getNthWord(s, n) {
    return s.split(' ')[n];
}

function setLikeClass() {
    var firstLike = $('.UFILikeLink:eq(0)');
    console.log(firstLike);
    var isLiked = firstLike.hasClass('UFILinkBright');
    var thumbClasses = firstLike.find('i').attr('class');
    console.log(thumbClasses);
    imageSheetClass = getNthWord(thumbClasses, 2);
    if (!isLiked) {
        likeClass = getNthWord(thumbClasses, 3);
        return;
    }
    firstLike[0].click();
    thumbClasses = firstLike.find('i').attr('class');
    console.log(thumbClasses);
    likeClass = getNthWord(thumbClasses, 3);
}

//click every like button on facebook
function likeAllFacebook(){
      //like everything on the news feed
      var likes = $('.UFILikeLink');
      for (var i = 0; i < likes.length; i++) {
          var like = $(likes[i]);
          if (!like.hasClass('UFILinkBright') && like.text() !== 'Unlike') {
              // don't let it scroll to the top
              like.attr('href', 'javascript:void();');
              // fire away!
              likes[i].click();
          }
      }
}

//hide the likes and make it seem normal
function cleanupFacebook(){
    var likes = $('.UFILikeLink');
    for (var i = 0; i < likes.length; i++) {
        var like = $(likes[i]);

        // make '(y) Like' gray instead of blue
        likes[i].className = "UFILikeLink";
        //like.find('i').hide();//css('background-image', 'url(https://i.imgur.com/l3t60fm.jpg) !important');
        //like.find('i').removeClass('sx_500eea').addClass('sx_e0a7f7');
        //like.find('i').removeClass('sx_e7f31c').addClass('sx_c5cfba');
        like.find('i').attr('class', 'UFILikeLinkIcon img ' + imageSheetClass + ' ' + likeClass);

        // change 'Unlike' to 'Like' after liking a comment
        if (like.text() === "Unlike") {
            like.text("Like");
            var likeParent = like.parent();
            likeParent.find('span').each(function() {
                var isLikeCount = $(this).attr('data-reactid').indexOf('likeCount') > -1
                    && $(this).attr('role') !== 'presentation';
                // if you're the only one who likes the comment, remove the thumbs up, like count, and dot
                if (isLikeCount && $(this).text() == "1") {
                    likeParent.find('a.UFICommentLikedButton').hide();
                    likeParent.find('span[role="presentation"]:eq(1)').hide();
                } else if (isLikeCount) {
                    // otherwise decrement the number of likes by 1
                    var currentLikes = Number($(this).text());
                    $(this).text(String(currentLikes - 1));
                    // remove tooltip and 'see who liked' functionality
                    likeParent.find('a.UFICommentLikedButton').attr('ajaxify', '')
                        .attr('data-hover', '').removeAttr('href');
                }
            });
        }

        // finding row with the likes and seen count
        var ufiRow = like.parent().parent().parent().parent().find('.UFIRow');
        // find the bar displaying who liked the post
        var ufiLikeSentenceText = ufiRow.find('.UFILikeSentenceText');
        // look for instances of 'You like this.' or 'You, ... like this' and remove
        ufiLikeSentenceText.find('span').each(function() {
            var likeSpan = $(this);
            // when only you like this, either float the seen count to the left or remove row if seen count isn't present
            if (likeSpan.text() === "You like this.") {
                likeSpan.hide();
                // float seen count to right
                if (ufiRow.find('.UFISeenCount').length > 0) {
                    ufiRow.find('.UFISeenCountRight').removeClass('UFISeenCountRight');
                    ufiRow.find('> .clearfix > .rfloat').removeClass('rfloat');
                    ufiRow.find('> .clearfix > ._ohf').removeClass('_ohf');
                // remove bar
                } else {
                    ufiLikeSentenceText.parent().parent().parent().hide();
                }
            }
            // otherwise just remove the 'you...' part
            if (likeSpan.text() === "You, " || likeSpan.text() === "You and ") {
                likeSpan.hide();
                // if only one other person liked the post, then replace ' like this.' with ' likes this'
                var otherLikes = likeSpan.parent().find('> a');
                if (otherLikes.length === 1 && otherLikes.text().indexOf(' other') === -1) {
                    ufiLikeSentenceText.children().find('> span').each(function() {
                        if ($(this).text().indexOf(' this.') > -1) {
                            $(this).text(' likes this.');
                        }
                    });
                }
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

    setLikeClass();
    var lastScrollHeight = 0;

    if(document.cookie.indexOf('c_user') != -1){ //check if logged in before running anything 
        likeAllFacebook();
        cleanupFacebook();
        clickiFrameButtons();
             
        $(document).on('scroll', function() {
            var currScrollHeight = $(document).scrollTop();
            if (currScrollHeight > lastScrollHeight + 1000 || currScrollHeight < lastScrollHeight - 1000) {
                likeAllFacebook();
                cleanupFacebook();
                clickiFrameButtons();
                lastScrollHeight = currScrollHeight;
            }
        });
    }
    
});