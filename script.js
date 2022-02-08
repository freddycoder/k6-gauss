import { check, sleep } from 'k6';
import http from 'k6/http';
import { gaussianStages, randn_bm } from './gaussian.js'

export let options = {
  // gaussianStages(days, hours, minutes, seconds, nbVUgenerator(t)) => list of k6 stages
  // randn_bm(min, max, skew) => a number
  // gaussian(mean, stdev) => a function that produce
  
  // Example using randn_bm function
  stages: gaussianStages(0, 0, 10, 0, (t) => { return randn_bm(0, 24, 3);}),
  
  // Example using gaussian function
  //stages: gaussianStages(0, 0, 2, 1, (t) => { 
  //    var mean = 6;
  //    var stdev = 3;
  //    return gaussian(mean, stdev)();
  //  }),
  
  // Example using both functions and a sin function to change the value of the mean
  //stages: gaussianStages(0, 0, 2, 1, (t) => { 
  //    var mean = randn_bm(0, 10, 3);
  //    var stdev = randn_bm(3, 7, 1);
  //    return gaussian(mean + Math.sin(t / 3600), stdev)();
  //  }),
  
  thresholds: {
    'http_req_duration': ['p(95)<1000']
  }
};

export default function () {
    var url = "http://localhost"

    var response = http.get(url, params);

    check(response, {
        'status was 200': r => r.status === 200,
        'transaction time OK': r => r.timings.duration < 200
    });

    var sleepTime = 1000 - response.timings.duration;

    if (sleepTime > 0) {
        sleep(sleepTime / 1000);
    }
  }
