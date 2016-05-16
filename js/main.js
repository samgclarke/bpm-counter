/* globals */
var data = new Object();
var views = new Array();

data.tally = [];
data.timing = {start: undefined, end: undefined};
data.genres = {
  80: 'Reggae',
  90: 'Hip Hop',
  100: 'House',
  110: 'House',
  120: 'Breaks',
  130: 'Breaks',
  140: 'Trance',
  160: 'Drum & Bass',
  170: 'Drum & Bass'
};

views = [
  {id: 'root', title: 'Home'},
  {id: 'about', title: 'About'},
];

/* INIT */
(function init() {
  document.addEventListener("keydown", tap, false);
  changeToView('root');
})();


/* ROUTER */
function changeToView(toView) {
  // iterate views
  views.forEach( function (view) {
    if(view.id === toView) {
      // to View
      document.getElementById(view.id + '-link').className = "display-none";
      document.getElementById(view.id).className = "";
    } else {
      // other views
      document.getElementById(view.id).className = "display-none";
      document.getElementById(view.id + '-link').className = "";
    }
  });
};

/* EVENT HANDLING */
function reset(elementId) {
  data.tally = [];
  data.timing.start = undefined;
  data.timing.end = undefined;
  // remove focus
  document.getElementById(elementId).blur();
  document.getElementById("output").innerHTML = 'waiting...';
  document.getElementById("genre").innerHTML = 'waiting...';
};
function tap(e) {
  var timestamp, bpm, avg, round, genre, sum = 0;
  timestamp = (e) ? e.timeStamp : new Date();

  if (!data.timing.start) {
    showInterstitial();
    data.timing.start = timestamp;
  } 
  else if (!data.timing.end) {
    data.timing.end = timestamp;
  }
  else if (data.timing.start && data.timing.end) {
    data.timing.start = data.timing.end;
    data.timing.end = timestamp;
  }
  // calculate bpm
  bpm = 60000 / (data.timing.end - data.timing.start);
  
  if (bpm) {
    // push bpms to tall list
    data.tally.push(bpm);
    // calculate sum of bpms
    data.tally.forEach( function (el, i) {
      sum += el;
    });
    // average all bpms
    avg = Math.round(sum / data.tally.length);
    if (avg) {
      document.getElementById("output").innerHTML = avg + ' bpm';
      // get genre
      round = Math.floor(avg / 10) * 10;
      genre = data.genres[round];
      document.getElementById("genre").innerHTML = genre || 'Not sure...';
    };
  }
};
function showInterstitial() {
  document.getElementById("output").innerHTML = 'tap again!';
  document.getElementById("genre").innerHTML = 'awaiting second tap...';
}

