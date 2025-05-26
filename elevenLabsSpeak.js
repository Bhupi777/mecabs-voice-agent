import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const generateSpeech = async (text) => {
  const voiceId = process.env.ELEVENLABS_VOICE_ID;
  const outputPath = path.join('./audio', 'output.mp3');

  const res = await axios.post(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
    {
      text,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.4, similarity_boost: 0.75 }
    },
    {
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      responseType: 'arraybuffer'
    }
  );

  fs.writeFileSync(outputPath, res.data);
  return outputPath;
};
