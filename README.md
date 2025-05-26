# ME CABS Voice Agent

This AI-powered agent answers calls, transcribes voice, generates replies using DeepSeek, converts to speech with ElevenLabs, and plays it back to the caller.

## Deployment (Render)
1. Upload this repo to GitHub
2. Go to [https://render.com](https://render.com)
3. Click **New Web Service** and connect your GitHub
4. Set Start Command: `node server.js`
5. Set Runtime: Node 18+
6. Add all variables from `.env.example` into Render's Environment

## Twilio Setup
1. Go to Twilio Console > Phone Numbers
2. Under “A Call Comes In”, paste:
   ```
   https://<your-render-url>/call
   ```

## Environment Variables
See `.env.example` and add:
- Twilio SID, Token, Number
- Whisper API key (OpenAI)
- DeepSeek API key
- ElevenLabs API key and voice ID
- BASE_URL (your deployed site for /audio/output.mp3)

