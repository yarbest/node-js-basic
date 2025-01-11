import dotenv from 'dotenv';
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envFile });

import mongoose from 'mongoose';

import { Application } from "./application";
import middlewareParseJson from "./middlewares/middlewareParseJson";
import parseUrl from "./middlewares/middlewareParseUrl";
import { Path } from "./router";
import userRouter from "./users/user-router";

const app = new Application();

app.addMiddleWare(middlewareParseJson);
app.addMiddleWare(parseUrl(process.env.BASE_URL || 'http://localhost:3000'));
app.addRouter(userRouter);


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || '', {});
    app.listen(3000, () => {
      console.log('Server has been started on port 3000');
    })
  } catch(e) {
    console.log(e);
  }
}

start()


declare module 'http' {
  interface ServerResponse {
    send: (data: any) => void;
  }

  interface IncomingMessage {
    body: any
    pathname: Path
    params: {
      [key: string]: string
    }
  }
}