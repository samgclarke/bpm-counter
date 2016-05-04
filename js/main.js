var tally = [];
var timing = {start: undefined, end: undefined};
document.addEventListener("keydown", keyDowner, false);

function reset(elementId) {
  console.log('reset', elementId);
  tally = [];
  timing.start = undefined;
  timing.end = undefined;
  // remove focus
  document.getElementById(elementId).blur();
  document.getElementById("output").innerHTML = '';
};

function keyDowner(e) {
  var bpm, avg, sum = 0;

  if (!timing.start) {
    timing.start = e.timeStamp;
  } 
  else if (!timing.end) {
    timing.end = e.timeStamp
  }
  else if (timing.start && timing.end) {
    timing.start = timing.end;
    timing.end = e.timeStamp;
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
      document.getElementById("output").innerHTML = avg;
    };
  }
};