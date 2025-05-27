import twilio from 'twilio';
const { twiml } = twilio;

const processHandler = async (req, res) => {
  const response = new twiml.VoiceResponse();

  // Play a short test message directly from your Render static file (must exist)
  response.say('Thank you for calling ME CABS. Your booking has been received.');

  res.type('text/xml');
  res.send(response.toString());
};

export default processHandler;
