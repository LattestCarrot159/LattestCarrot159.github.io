$(function() {
	var $graph;
	var $col;
	var dropdown;
	
    function ComparatorQ(a, b) {
        if (a.qp < b.qp) return 1;
        if (a.qp > b.qp) return -1;
        return 0;
    }

    function ComparatorC(a, b) {
        if (a.comp < b.comp) return 1;
        if (a.comp > b.comp) return -1;
        return 0;
    }

    function fixHeroNames(str) {
        return toTitleCase(str).replace('_', ' ');
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function addGraph($graph, theList) {
        var barWidths = [];
        if (dropdown == "Quickplay") {
            $('#loading').css({
                opacity: 1.0,
                visibility: "visible"
            }).animate({
                opacity: 0
            }, function() {
                $.each(theList, function(i) {
                    $graph.append('<div class="timeBarContainer" id="' + theList[i].hero + 'TimeBar"><img class="heroIcon" src="resources/pics/hero_icons/' + theList[i].hero + '.png"> <div class="barGraph" id="' + theList[i].hero + '"> <p class="barLabel" id="' + theList[i].hero + 'Label">' + displayProperTimes(theList[i].qp) + '</p></div></div>');
                    $('#' + theList[i].hero).css('width', ((theList[i].qp / theList[0].qp) * 100) + '%');
                    barWidths.push((theList[i].qp / theList[0].qp) * 100);
                    $('#' + theList[i].hero).css('width', '0px');
                });
                var col2Height = $col.height();
                $col.css('height', '0px');
                $col.animate({
                    height: col2Height
                }, function() {
                    $.each(theList, function(i) {
                        $('#' + theList[i].hero).animate({
                            width: barWidths[i] + '%'
                        }, 1000, function() {
                            $('#' + theList[i].hero + 'Label').fadeIn(1000);
                        })
                    })
                });
            });
        } else {
        	$('#loading').css({
                opacity: 1.0,
                visibility: "visible"
            }).animate({
                opacity: 0
            }, function() {
                $.each(theList, function(i) {
                    $graph.append('<div class="timeBarContainer" id="' + theList[i].hero + 'TimeBar"><img class="heroIcon" src="resources/pics/hero_icons/' + theList[i].hero + '.png"> <div class="barGraph" id="' + theList[i].hero + '"> <p class="barLabel" id="' + theList[i].hero + 'Label">' + displayProperTimes(theList[i].comp) + '</p></div></div>');
                    $('#' + theList[i].hero).css('width', ((theList[i].comp / theList[0].comp) * 100) + '%');
                    barWidths.push((theList[i].comp / theList[0].comp) * 100);
                    $('#' + theList[i].hero).css('width', '0px');
                });
                var col2Height = $col.height();
                $col.css('height', '0px');
                $col.animate({
                    height: col2Height
                }, function() {
                    $.each(theList, function(i) {
                        $('#' + theList[i].hero).animate({
                            width: barWidths[i] + '%'
                        }, 1000, function() {
                            $('#' + theList[i].hero + 'Label').fadeIn(1000);
                        })
                    })
                });
            });
        }
    }

    function displayProperTimes(hours) {
        var finalTime = "";
        var minutes = 0;
        var seconds = 0;
        minutes = (hours % 1) * 60;
        seconds = (minutes % 1) * 60;
        finalTime = Math.floor(hours) + ':' + Math.floor(minutes) + ':' + Math.floor(seconds);
        return finalTime;
    }

    function loadHeroStats(username, graph, col) {
        var charList = [];
		dropdown = $('#dropDown1').find(":selected").text();
		$graph = graph;
		$col = col;
		
        $col.animate({
            height: '0px'
        }, function() {
            $graph.empty();
            $col.css({
                height: 'auto'
            });
        });

        console.log('Loading stats for ' + username);

        $.ajax({
            type: 'GET',
            url: 'https://owapi.net/api/v3/u/' + username + '/heroes',
            success: function(data) {
                var quickplay = data.us.heroes.playtime.quickplay;
                var competitive = data.us.heroes.playtime.competitive;
                var charList = [];

                console.log('URL load complete!');

                $.each(quickplay, function(i) {
                    var a = {
                        hero: i,
                        qp: quickplay[i],
                        comp: competitive[i]
                    }
                    if (a.comp == null) {
                        a.comp = 0;
                    }
                    charList.push(a);
                });
				
				if (dropdown == 'Quickplay') {
                	charList.sort(ComparatorQ);
				} else {
					charList.sort(ComparatorC);
				}
                console.log('Character list sorted by time played!');
                addGraph($graph, charList);
                document.getElementById("search").disabled = false;
            }
        });
    }

    $('#search').click(function() {
        $('#loading').css({
            opacity: 0.0,
            visibility: "visible"
        }).animate({
            opacity: 1.0
        });
        document.getElementById("search").disabled = true;
        loadHeroStats($('#battletag').val(), $('#graph'), $('#col2'));
    });
	
});