import express from 'express';
import cors from 'cors';
import { routes } from './routes';



const app = express();
const port = process.env.PORT || 3333;

console.log(port);

app.use(cors());
app.use(express.json())
app.use(routes);
app.listen(port, () => console.log(`HTTP Server running at ${port}`));