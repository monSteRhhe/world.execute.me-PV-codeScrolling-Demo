'use strict';

self.addEventListener('message', function (e) {
    var h = '00';
    var m = 0;
    var s = 0;
    var ms = 0;

    setInterval(function() {
        var time = h + ':' + checkTime(m) + ':' + checkTime(s) + ',' + checkTime(ms) + '0';
        self.postMessage(time);

        ms += 1;
        if(ms >= 100) {
            ms = 0;
            s += 1
        }
        if(s >= 60) {
            s = 0;
            m += 1;
        }
    }, 10)
}, false);

function checkTime(t) {
    if (t < 10) return t = "0" + t;
    else return t;
}

