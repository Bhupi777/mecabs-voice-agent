import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import twilio from 'twilio'; // ✅ Correct import for ESM
const { twiml } = twilio;

import { transcribeAudio } from './transcribeWhisper.js';
import { getDeepSeekReply } from './deepseekReply.js';
import { generateSpeech } from './elevenLabsSpeak.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processHandler = async (req, res) => {
  const recordingUrl = req.body.RecordingUrl;

  try {
    const audioRes = await axios.get(`${recordingUrl}.mp3`, { responseType: 'arraybuffer' });
    const audioPath = path.join(__dirname, '../audio/output.mp3');
    fs.writeFileSync(audioPath, Buffer.from(audioRes.data));

    const transcript = await transcribeAudio(audioPath);
    const aiReply = await getDeepSeekReply(transcript);
    await generateSpeech(aiReply);

    const response = new twiml.VoiceResponse();
    response.play(`${process.env.BASE_URL}/audio/output.mp3`);
    res.type('text/xml');
    res.send(response.toString());
  } catch (err) {
    console.error('Error:', err);
    const response = new twiml.VoiceResponse();
    response.say('Sorry, there was an error processing your request.', { voice: 'Polly.Dorothy' });
    res.type('text/xml');
    res.send(response.toString());
  }
};

export default processHandler;
