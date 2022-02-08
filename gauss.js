/*
    Create random number that is normally distributed.
    Source: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
*/
export function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

    num = num / 10.0 + 0.5 // Translate to 0 -> 1
    if (num > 1 || num < 0) 
        num = randn_bm(min, max, skew) // resample between 0 and 1 if out of range

    else{
        num = Math.pow(num, skew) // Skew
        num *= max - min // Stretch to fill range
        num += min // offset to min
    }
    return num
}

/*
 returns a gaussian random function with the given mean and stdev.
 Source: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
*/
export function gaussian(mean, stdev) {
  var y2;
  var use_last = false;
  return function() {
    var y1;
    if (use_last) {
      y1 = y2;
      use_last = false;
    } else {
      var x1, x2, w;
      do {
        x1 = 2.0 * Math.random() - 1.0;
        x2 = 2.0 * Math.random() - 1.0;
        w = x1 * x1 + x2 * x2;
      } while (w >= 1.0);
      w = Math.sqrt((-2.0 * Math.log(w)) / w);
      y1 = x1 * w;
      y2 = x2 * w;
      use_last = true;
    }

    var retval = mean + stdev * y1;
    if (retval > 0)
      return retval;
    return -retval;
  }
}

/*
    Generate a list of stages for a k6 test.
*/
export function gaussianStages(days, hours, minutes, secondes, randomVUGenerator) {
    let gaussianStages = [];

    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + secondes;

    for (var t = 0; t < totalSeconds; t++) {
        gaussianStages.push({ 
            target: Math.max(0, Math.floor(randomVUGenerator(t))), 
            duration: '1s' 
        });
    }

    return gaussianStages;
}
