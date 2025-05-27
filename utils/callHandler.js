import twilio from 'twilio';
const { twiml } = twilio;

const callHandler = async (req, res) => {
  const voiceResponse = new twiml.VoiceResponse();

  // Greet the caller
  voiceResponse.say(
    { voice: 'Polly.Dorothy' },
    'Hello, ME CABS. How may I help you? Please tell me your pickup and drop-off location after the beep.'
  );

  // Record caller's message
  voiceResponse.record({
    action: '/process',
    method: 'POST',
    maxLength: 30,
    transcribe: false,
    playBeep: true,
    trim: 'do-not-trim'
  });

  // Fallback message if no input
  voiceResponse.say(
    { voice: 'Polly.Dorothy' },
    'Sorry, I did not receive any response. Please call again.'
  );

  // Send TwiML response
  res.type('text/xml');
  res.send(voiceResponse.toString());
};

export default callHandler;
