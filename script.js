import { check, sleep } from 'k6';
import http from 'k6/http';
import { gaussianStages, randn_bm } from './gaussian.js'

export let options = {
  // gaussianStages(days, hours, minutes, seconds, nbVUgenerator())
  // randn_bm(min, max, skew)
  stages: gaussianStages(0, 0, 10, 0, () => { return randn_bm(0, 24, 3);}),
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
