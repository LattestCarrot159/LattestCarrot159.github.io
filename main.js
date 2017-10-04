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
	
<<<<<<< HEAD
    var charRequest = new XMLHttpRequest();
    var $wrapper = $('#wrapper');
    var charList = new Array();
	
    $('#search').click(function () {
        charList.length = 0;
        $('#graph').empty();
		charRequest.open('GET', 'https://owapi.net/api/v3/u/' + $('#battletag').val() + '/heroes');
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
            $('#col2').animate({ height: charList.length * 23.5 + 'px' }, 1000, function () { 
			    for (var i in charList) {
                    $('#graph').append('<tr><td><div class="charName">' + charList[i].key + '</div><div class="outline"><div id="' + charList[i].key + '" class="bar"></div></div><div>' + charList[i].timesFixed + '</div></td></tr>');
                    $('#' + charList[i].key).animate({ width: (charList[i].times / charList[0].times) * 200 + 'px' }, 1000);
                };
            });
        };
        charRequest.send();
    });
=======
	charRequest.open('GET', 'https://owapi.net/api/v3/u/LatestCarrot-1839/heroes');	
	charRequest.onload = function() {
		var charData = JSON.parse(charRequest.responseText);
		var character = charData.us.heroes.playtime.quickplay;
		i = 0;
		var times = Object.values(character)[i];
		var timesFixed = times;
		for (var key in character) {
			times = Object.values(character)[i];
			if (times < 1) {
				if (times * 60 < 1){
					timesFixed = times * 60 * 60 + ' Seconds';
				}
				else {
					timesFixed = times * 60 + ' Minutes';
				};
			}
			else {
				timesFixed = times + ' Hours';
			};
			$charWrapper.append('<div class="char" id="' + key + '"><p class="charName">' + key + '<br>' + timesFixed + '</p><img src="resources/pics/' + key + '.png"></img></div><br><br>');
			console.log(key + ', ' + timesFixed);
			$("#" + key).hide();
			$("#" + key).delay(i * 500).fadeIn(1000);
			console.log("#" + key);
			i++;
		};
	};
	charRequest.send();
>>>>>>> 81106d361fb86dd54ad7ea4b0eb3e73ae13a4e3b
});
