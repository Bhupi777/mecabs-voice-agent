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
  const response = new twiml.VoiceResponse();

  try {
    // Download the recorded audio
    const audioRes = await axios.get(`${recordingUrl}.mp3`, {
      responseType: 'arraybuffer'
    });

    // Save locally as output.mp3
    const audioPath = path.join(__dirname, '../audio/output.mp3');
    fs.writeFileSync(audioPath, Buffer.from(audioRes.data));

    // Transcribe using Whisper
    const transcript = await transcribeAudio(audioPath);

    // Generate AI reply using DeepSeek
    const aiReply = await getDeepSeekReply(transcript);

    // Convert to speech using ElevenLabs
    await generateSpeech(aiReply);

    // Play the ElevenLabs-generated MP3 to the caller
    response.play(`${process.env.BASE_URL}/audio/output.mp3`);
  } catch (err) {
    console.error('Error in /process:', err);
    response.say('Sorry, something went wrong. Please try again later.');
  }

  res.type('text/xml');
  res.send(response.toString());
};

export default processHandler;
