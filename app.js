import express from 'express';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __dirname = dirname(fileURLToPath(import.meta.url));

  
const app = express();
const PORT = process.env.port || 3000;

app.use(express.json()); 

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT);

app.get('/', (req, res) => res.render('../views/pages/index'));


export default app
