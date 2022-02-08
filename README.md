# k6-gauss

Generate fluctuation in load testing with k6.

## Usage

Copy the gaussian.js file in your project and import the script and functions.

```
import { gaussian, gaussianStages, randn_bm } from './gaussian.js'
```

## Create the list of stages using the gaussianStages function

The function gaussianStages is define as:
```
export function gaussainStages(days, hours, minutes, secondes, nbVUcallback(t))
```

The parameter 't' of the callback function is the second to generate a number representing the VU count of this second during the test. The first time the callbask is call, the value will be 0, the next time 1, and so on.

Example 1. Using rand_bm function

```
export let options = {
  // Example using randn_bm function
  stages: gaussianStages(0, 0, 10, 0, (t) => { return randn_bm(0, 24, 3);}),
}
```

Exmaple 2. Using gaussian function

```
export let options = {
  // Example using gaussian function
  stages: gaussianStages(0, 0, 2, 1, (t) => { 
      var mean = 6;
      var stdev = 3;
      return gaussian(mean, stdev)();
    }),
}
```

Example 3. Using the callback parameter t to change the mean value

```
export let options = {
  // Example using both functions and a sin function to change the value of the mean
  stages: gaussianStages(0, 0, 2, 1, (t) => { 
      var mean = randn_bm(0, 10, 3);
      var stdev = randn_bm(3, 7, 1);
      return gaussian(mean + Math.sin(t / 3600), stdev)();
    }),
 }
```
