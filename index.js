const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const balances = {};

app.use(express.json());

app.post('/update-balance', (req, res) => {
  const { userId, balance } = req.body;

  if (!userId || balance == null) {
    return res.status(400).send('Missing userId or balance');
  }

  balances[userId] = balance;
  res.send('Balance updated');
});

app.get('/get-balance/:userId', (req, res) => {
  const userId = req.params.userId;

  if (!balances[userId]) {
    return res.status(404).send('User not found');
  }

  res.json({ balance: balances[userId] });
});

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
