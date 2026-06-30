import express from 'express';
import cors from 'cors';
import { AccessToken } from 'livekit-server-sdk';
import 'dotenv/config'; // Loads your .env variables securely

const app = express();
app.use(cors()); // Allows your frontend to talk to this server
app.use(express.json());

app.post('/get-token', async (req, res) => {
  const { roomName, participantName } = req.body;

  if (!roomName || !participantName) {
    return res.status(400).json({ error: 'Missing roomName or participantName' });
  }

  try {
    // 1. Initialize the access token with your secret credentials
    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY,
      process.env.LIVEKIT_API_SECRET,
      { identity: participantName }
    );

    // 2. Set permissions (Join room, publish video/audio, subscribe to others)
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    // 3. Convert token to a JWT string and send it to the frontend
    const token = await at.toJwt();
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
