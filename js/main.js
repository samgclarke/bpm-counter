var tally = [];
var timing = {start: undefined, end: undefined};
document.addEventListener("keydown", keyDowner, false);

var genres = {
  80: 'Reggae',
  90: 'Hip Hop',
  100: 'House',
  110: 'House',
  120: 'Breaks',
  130: 'Breaks',
  140: 'Trance',
  160: 'Drum & Bass',
  170: 'Drum & Bass'
}

function reset(elementId) {
  console.log('reset', elementId);
  tally = [];
  timing.start = undefined;
  timing.end = undefined;
  // remove focus
  document.getElementById(elementId).blur();
  document.getElementById("output").innerHTML = 'waiting...';
  document.getElementById("genre").innerHTML = 'waiting...';
};

function keyDowner(e) {
  var timestamp, bpm, avg, sum = 0;

  timestamp = (e) ? e.timeStamp : new Date();

  if (!timing.start) {
    timing.start = timestamp;
  } 
  else if (!timing.end) {
    timing.end = timestamp;
  }
  else if (timing.start && timing.end) {
    timing.start = timing.end;
    timing.end = timestamp;
  }
  // calculate bpm
  bpm = 60000 / (timing.end - timing.start);
  
  if (bpm) {
    // push bpms to tall list
    tally.push(bpm);
    // calculate sum of bpms
    tally.forEach( function (el, i) {
      sum += el;
    });
    // average all bpms
    avg = Math.round(sum / tally.length);
    if (avg) {
      document.getElementById("output").innerHTML = avg + ' bpm';

      // get genre
      var round = Math.floor(avg / 10) * 10;
      var genre = genres[round];
      console.log('round, genre', [round, genre]);
      document.getElementById("genre").innerHTML = genre;
    };
  }
};
