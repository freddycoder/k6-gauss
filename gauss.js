/*
    Create random number that is normally distributed.
    Source: https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
*/
export function randn_bm(min, max, skew) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random()
    let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )

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
    Generate a list of stages for a k6 test.
*/
export function gaussianStages(days, hours, minutes, secondes, randomVUGenerator) {
    let gaussianStages = [];

    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + secondes;

    for (var i = 0; i < totalSeconds; i++) {
        gaussianStages.push({ target: Math.floor(randomVUGenerator()), duration: '1s' });
    }

    return gaussianStages;
}
