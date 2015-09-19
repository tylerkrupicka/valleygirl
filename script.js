$(document).ready(function() {
/*
    var likes = $('.UFILikeLinkIcon');
        for (var i = 0; i < likes.length; i++) {
            likes[i].click();
        }
    }
*/
    var likebtns = $('.pluginButton[title="Like"] button[title="Like"]');
    $('div[title="Unlike"]').remove();
    $('.pluginCountButton').remove();
    for (var i = 0; i < likebtns.length; i++) {
        var cNames = $('div[title="Like"]').attr('class');
        var likebtn = likebtns[i];
        if (!$('div[title="Like"]').hasClass('hidden_elem')) {
            likebtn.click();
        }
    }
});
