import liveServer from 'live-server';
import { resolve } from 'node:path';
import { argv } from 'node:process';
import parseArgv from './parseArgv.js';

/* directories -------------------------------------------------------------- */

const frontendDir = resolve('frontend');

const DIR = {
  public: resolve(frontendDir, 'public'),
  src: resolve(frontendDir, 'src'),
};

/* parameters --------------------------------------------------------------- */

let params = {
  host: 'localhost',
  port: 3000,
  root: DIR.public,
  file: 'index.html',
  mount: [['/scripts', DIR.src]], // 경로, rout
  open: false,
  wait: 200,
};

const customParams = parseArgv(argv);


// 이 구문의 정체는 ?
// 스프레드 오퍼레이터
// 객체 합성 , 구조를 전개해서 객체를 합성할떄 사용
// Object.assing() 

params = { ...params, ...customParams };

/* start server ------------------------------------------------------------- */

liveServer.start(params);
