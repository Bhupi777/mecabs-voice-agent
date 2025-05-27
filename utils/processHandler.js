import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import twilio from 'twilio';
const { twiml } = twilio;

import { transcribeAudio } from './transcribeWhisper.js';
import { getDeepSeekReply } from './deepseekReply.js';
import { generateSpeech } from './elevenLabsSpeak.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const processHandler = async (req, res) => {
  const recordingUrl = req.body.RecordingUrl;
  const voiceResponse = new twiml.VoiceResponse();

  try {
    const audioRes = await axios.get(`${recordingUrl}.mp3`, { responseType: 'arraybuffer' });
    const audioPath = path.join(__dirname, '../audio/output.mp3');
    fs.writeFileSync(audioPath, Buffer.from(audioRes.data));

    const transcript = await transcribeAudio(audioPath);
    const aiReply = await getDeepSeekReply(transcript);
    await generateSpeech(aiReply);

    voiceResponse.play(`${process.env.BASE_URL}/audio/output.mp3`);
  } catch (err) {
    console.error('Error in /process:', err);
    voiceResponse.say({ voice: 'Polly.Dorothy' }, 'Sorry, something went wrong. Please try again later.');
  }

  res.type('text/xml');
  res.send(voiceResponse.toString());
};

export default processHandler;
