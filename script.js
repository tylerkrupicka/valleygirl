$(document).ready(function() {
    var likeUrls = [];
    var $iframes = $('iframe[title="fb:like Facebook Social Plugin"]');
    $iframes.each(function($iframe) {
        likeUrls.push($iframe.src);
        $iframe.remove();
    });
    $(body).append('<div id="lbloadContainer" style="display:none;"></div>');
    for (var i = 0; i < likeUrls.length; i++) {
        $('#lbloadContainer').load(likeUrls[i], function() {
            var tempBtn = $('$lbloadContainer button');
            tmpBtn.click();
            tmpBtn.remove();
        });
    }
    // cleanup
    $('#lbloadContainer').remove();
});
