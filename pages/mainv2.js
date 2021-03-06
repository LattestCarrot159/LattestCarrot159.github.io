$(function() {
    var charRequest = new XMLHttpRequest();
    var $wrapper = $('#wrapper');
    var charList = new Array();

    function pageSetup() {
        $('.effect').hide();
        $('#wrapper').css("width", "0px");
        $('#wrapper').css("height", "0px");
        $('#col2').css("height", "0px");
        $('#wrapper').animate({
            width: "1010px"
        }, 1000);
        animateAutoHeight($('#wrapper'), $('.effect'))
    }

    function animateAutoHeight(elementToUse, effectClass) {
        var curHeight = elementToUse.height();
        effectClass.show();
        elementToUse.css('height', 'auto');
        var newHeight = elementToUse.height();
        effectClass.hide();
        elementToUse.css('height', curHeight);
        elementToUse.animate({
            height: newHeight
        }, 1000, function() {
            effectClass.fadeIn(1000);
        });
    }

    pageSetup();
});