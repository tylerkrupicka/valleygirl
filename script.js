$(document).ready(function() {
    setTimeout(function() {

    if ($) {
        var likes = $('.UFILikeLinkIcon');
        for (var i = 0; i < likes.length; i++) {
            likes[i].click();
        }
    }




    var likeUrls = [];
    var $iframes = $('iframe[title="fb:like Facebook Social Plugin"]');
    console.log('!!!!!!!!!!!!!!');
    console.log($iframes);
    $iframes.each(function(i) {
        console.log('!!!!!!!!!!!!!!!!!!');
        console.log($iframes[i]);
        likeUrls.push($iframes[i].src);
        $iframes[i].remove();
    });
    $('body').append('<div id="lbloadContainer" style="display:none;"></div>');
    for (var i = 0; i < likeUrls.length; i++) {
        $('#lbloadContainer').load(likeUrls[i], function() {
            var tmpBtn = $('#lbloadContainer button');
            tmpBtn.click();
            tmpBtn.remove();
        });
    }
    // cleanup
    $('#lbloadContainer').remove();
    }, 5000);
});
