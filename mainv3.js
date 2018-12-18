$(function() {
    function loadHeroStats(username) {
        var charRequest = new XMLHttpRequest();
        var $wrapper = $('#wrapper');
        var charList = [];

        charRequest.open('GET', 'https://owapi.net/api/v3/u/' + username + '/heroes');
        charRequest.onload = function() {
            var charData = JSON.parse(charRequest.responseText);
            var character = charData.us.heroes.playtime.quickplay;

            console.log(charData);
        }
    }

    loadHeroStats('latestcarrot-1839');
});