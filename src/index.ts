import dotenv from 'dotenv';
import { Application } from "./application";
import middlewareParseJson from "./middlewares/middlewareParseJson";
import parseUrl from "./middlewares/middlewareParseUrl";
import { Path } from "./router";
import userRouter from "./users/user-router";

dotenv.config();
const app = new Application();

app.addMiddleWare(middlewareParseJson);
app.addMiddleWare(parseUrl(process.env.BASE_URL || 'http://localhost:3000'));
app.addRouter(userRouter);

app.listen(3000, () => {
  console.log('Server has been started on port 3000');
})

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