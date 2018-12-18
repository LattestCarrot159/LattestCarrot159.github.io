$(function() {
    var $wrapper = $('#wrapper');

    function pageSetup() {
        $('.effect').hide();
        $wrapper.css("width", "0px");
        $wrapper.css("height", "0px");
        $('#col2').css("height", "0px");
        $wrapper.animate({
            width: "1010px"
        }, 1000);
        
        animateAutoHeight($wrapper, $('.effect'))
        console.log('Beginning search');
        searchForUser('LatestCarrot159-1839', $('#graph'))
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

    function searchForUser(username, graph) {
        var charRequest = new XMLHttpRequest();
        var charList = [];

        graph.empty();
        console.log('Graph emptied');
        
        console.log('Loading API (May take a moment aka a long while)');
        charRequest.open('GET', 'https://owapi.net/api/v3/u/' + username + '/heroes');
        console.log('did u get it?');
        
        charRequest.onload = function() {
        	console.log('load Complete!!!!');
        	
        	console.log('setting char vars');
            var charData = JSON.parse(charRequest.responseText);
            var character = charData.us.heroes.playtime.quickplay;
            console.log('Complete!');
            
			var i = 0;
            var times;
            
            function Comparator(a, b) {
                if (a.times < b.times) return 1;
                if (a.times > b.times) return -1;
                return 0;
            };
            
            for (var key in character) {
                times = Object.values(character)[i];
                if (times < 1) {
                    if (times * 60 < 1) {
                        timesFixed = times * 60 * 60 + ' Seconds';
                    } else {
                        timesFixed = times * 60 + ' Minutes';
                    };
                } else {
                    timesFixed = times + ' Hours';
                };
                
                console.log('Adding to charList!');
                charList.push({
                    key,
                    timesFixed,
                    times
                });
                i++;
            };
            console.log('Search Finished');
            charList.sort(Comparator);
            graph.append('<tr><td><div class="charName">' + charList[i].key + '</div><div class="outline"><div id="' + charList[i].key + '" class="bar"></div></div><div>' + charList[i].timesFixed + '</div></td></tr>');
            
        }
    }

    pageSetup();
});