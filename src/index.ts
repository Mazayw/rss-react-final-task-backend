/*
Uncomment for local development
import * as dotenv from 'dotenv';
dotenv.config();
*/

import mongoose from 'mongoose';
import { PORT } from './constants';
import * as serverService from './services/server.service';

const url = process.env.DB_CONNECT_STRING as string;

(async () => {
  try {
    await mongoose.connect(url);
    serverService.server.listen(process.env.PORT || PORT, function () {
      console.log('Сервер ожидает подключения...');
    });
  } catch (error) {
    console.log(error);
  }
})();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
});
