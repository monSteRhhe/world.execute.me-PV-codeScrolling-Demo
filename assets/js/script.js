'use strict';


$(document).ready(function() {
    // read srt file
    var srtFile = $.ajax({url: "assets/src/world.execute(me)-en.srt", async: false});
    var fullSrt = srtFile.responseText;
    var splitText = fullSrt.split('\r\n');


    // seperate time span & lyric
    var timeSpan = new Array();
    var count1 = 1;
    while(count1 < splitText.length) {
        timeSpan.push(splitText[count1]);
        count1 += 4;
    }


    // start time
    var startTime = new Array();
    var count3 = 0;
    while(count3 < timeSpan.length) {
        var sp = timeSpan[count3].split(' --> ')[0];
        startTime.push(sp);
        count3 += 1;
    }


    // end time
    var endTime = new Array();
    var count4 = 0
    while(count4 < timeSpan.length) {
        var sp = timeSpan[count4].split(' --> ')[1];
        endTime.push(sp);

        if(count4 + 1 == timeSpan.length) var terminatePlay = sp;
        count4 += 1;
    }


    // seperate lyrics
    var lyricText = new Array();
    var count2 = 2;
    while(count2 < splitText.length) {
        lyricText.push(splitText[count2]);
        count2 += 4;
    }


    // seperate code
    var codeFile = $.ajax({url: "assets/src/code.txt", async: false});
    var fullCode = codeFile.responseText;
    var splitCode = fullCode.split('\r\n\r\n\r\n\r\n\r\n\r\n');
    for(var i = 0; i < splitCode.length; i++) {
        splitCode[i] = splitCode[i].replace(/\r\n/g, '<br/>');
    }
})

$('.start').click(function(){
    $('.start').fadeOut();
    music.play();
    audioTime();
})

function audioTime() {
    setInterval(function() {
        var ct = music.currentTime.toFixed(3);
        var m = parseInt(ct / 60);
        var s = parseInt(ct % 60);
        var ms = parseInt((ct % 60 - s) * 100);

        var time = '00:' + checkTime(m) + ':' + checkTime(s) + ',' + checkTime(ms) + '0';
        perform(time);
    }, 1)
}


function checkTime(t) {
    if (t < 10) return t = "0" + t;
    else return t;
}


// audio player
music.volume = 0.2;
music.autoplay = false;
music.loop = false;
music.preload = 'auto';


var ln = 0;
var wh = $(window).height();
function perform(time) {
    if(time.indexOf(startTime[ln]) != -1){
        $('.lyric').html(lyricText[ln]);
        ln += 1;
    }
    else if(time.indexOf(endTime[ln - 1]) != -1) {
        $('.lyric').empty();
    }

    if(time == startTime[0]) startScroll(0);
    if(time == startTime[12]) startScroll(1);
    if(time == startTime[23]) startScroll(2);
    if(time == endTime[31]) startScroll(3);
    if(time == endTime[42]) startScroll(4);
    if(time == endTime[53]) startScroll(5);
    if(time == endTime[62]) startScroll(6);
    if(time == startTime[78]) startScroll(7);
    if(time == endTime[92]) startScroll(8);
    if(time == endTime[103]) startScroll(9);
    if(time == startTime[115]) startScroll(10);
}


var speedList = ['0.419', '0.569', '0.558', '0.579', '0.373', '0.379', '0.369', '0.814', '0.488', '0.494', '0.708'];
function startScroll(n) {
    var cl = '.s' + n;
    var h = $(cl).height();
    var m = 0;

    if($(cl).length == 0) $('.scroll').append('<span class="s' + n + '">' + splitCode[n] + '</span>');

    var loop = setInterval(function() {
        if(n == 10 && m < -377) {
            $('.s10').fadeOut();
            $('.filter').css('opacity', '1');
        }
        if(m > - 754 - h) {
            m -= speedList[n];
            $(cl).css('transform', 'translateY(' + m + 'px)');
        }
        else clearInterval(loop);
    }, 10)
}

