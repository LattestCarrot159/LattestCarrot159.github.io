$(function() {
    function loadHeroStats(username) {
    	console.log('Variable initilization');
        var charRequest = new XMLHttpRequest();
        var $wrapper = $('#wrapper');
        var charList = [];
        console.log('Variable initilization ocmplete!');
        
        console.log('opening URL');
        charRequest.open('GET', 'https://owapi.net/api/v3/u/' + username + '/heroes');
        console.log('Complete!');
        charRequest.onload = function() {
        	console.log('Load complete!');
            var charData = JSON.parse(charRequest.responseText);
            var character = charData.us.heroes.playtime.quickplay;

            console.log(charData);
        }
    }

    loadHeroStats('latestcarrot-1839');
});