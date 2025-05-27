import twilio from 'twilio';
const { twiml } = twilio;

const callHandler = async (req, res) => {
  const response = new twiml.VoiceResponse();

  response.say(
    { voice: 'Polly.Dorothy' },
    'Hello. This is ME CABS. Please leave your message after the beep.'
  );

  response.record({
    action: '/process',
    method: 'POST',
    maxLength: 30,
    transcribe: false,
    playBeep: true,
    trim: 'do-not-trim'
  });

  response.say(
    { voice: 'Polly.Dorothy' },
    'We did not receive anything. Goodbye.'
  );

  res.type('text/xml');
  res.send(response.toString());
};

export default callHandler;
