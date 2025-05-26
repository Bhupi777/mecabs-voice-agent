import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import callHandler from './utils/callHandler.js';
import processHandler from './utils/processHandler.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/audio', express.static(path.join(__dirname, 'audio')));

app.post('/call', callHandler);
app.post('/process', processHandler);

app.listen(PORT, () => {
  console.log(`🚕 ME CABS Voice Agent running on port ${PORT}`);
});
