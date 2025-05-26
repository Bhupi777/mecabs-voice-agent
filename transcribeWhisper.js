import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

export const transcribeAudio = async (filePath) => {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('model', 'whisper-1');

  const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, {
    headers: {
      ...formData.getHeaders(),
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  });

  return response.data.text;
};
