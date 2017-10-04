$(function() {
    $('.effect').hide();
    $('#wrapper').css("width", "0px");
    $('#wrapper').css("height", "0px");
    $('#wrapper').animate({
        height: "900px",
        width: "1010px"
    }, 1000, function() {
        $('.effect').fadeIn(1000);
    });
	
    var charRequest = new XMLHttpRequest();
    var $wrapper = $('#wrapper');
    var charList = new Array();
    $('#search2').click(function () {
        charList.length = 0;
        $('#graph2').empty();
        charRequest.open('GET', 'https://owapi.net/api/v3/u/' + $('#battletag2').val() + '/heroes');
        charRequest.onload = function () {
            var charData = JSON.parse(charRequest.responseText);
            var character = charData.us.heroes.playtime.quickplay;

            function Comparator(a, b) {
                if (a.times < b.times) return 1;
                if (a.times > b.times) return -1;
                return 0;
            };
            i = 0;
            var times = Object.values(character)[i];
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
                charList.push({
                    key,
                    timesFixed,
                    times
                });
                i++;
            };
            charList.sort(Comparator);
            $('#col2').animate({ height: charList.length * 23.5 + 'px' }, 1000, function () {
                for (var i in charList) {
                    $('#graph2').append('<tr><td><div class="charName">' + charList[i].key + '</div><div class="outline"><div id="' + charList[i].key + '2" class="bar"></div></div><div>' + charList[i].timesFixed + '</div></td></tr>');
                    $('#' + charList[i].key + '2').animate({ width: (charList[i].times / charList[0].times) * 200 + 'px' }, 1000);
                };
            });
        };
        charRequest.send();
    });
    $('#search1').click(function () {
        charList.length = 0;
        $('#graph1').empty();
		charRequest.open('GET', 'https://owapi.net/api/v3/u/' + $('#battletag1').val() + '/heroes');
        charRequest.onload = function() {
            var charData = JSON.parse(charRequest.responseText);
            var character = charData.us.heroes.playtime.quickplay;

            function Comparator(a, b) {
                if (a.times < b.times) return 1;
                if (a.times > b.times) return -1;
                return 0;
            };
            i = 0;
            var times = Object.values(character)[i];
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
                charList.push({
                    key,
                    timesFixed,
                    times
                });
                i++;
            };
            charList.sort(Comparator);
            $('#col1').animate({ height: charList.length * 23.5 + 'px' }, 1000, function () { 
			    for (var i in charList) {
                    $('#graph1').append('<tr><td><div class="charName">' + charList[i].key + '</div><div class="outline"><div id="' + charList[i].key + '1" class="bar"></div></div><div>' + charList[i].timesFixed + '</div></td></tr>');
                    $('#' + charList[i].key + '1').animate({ width: (charList[i].times / charList[0].times) * 200 + 'px' }, 1000);
                };
            });
        };
        charRequest.send();
    });
});
