$(function (){
	var charRequest = new XMLHttpRequest();
	var $charWrapper = $('#charWrapper');
	
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
			i++;
		};
	};
	charRequest.send();
	$
});