import express from 'express';
import { SERVER_PORT } from './constants/app.constant.js';
import { apiRouter } from './routers/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter);
//라우터 미들웨어 쓸거야, /api 있으면 api라우터로 보내기

app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});
