// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // admin UI files (optional)

const TRC20_ADDRESS = 'TWzZVoKptLx3KJfshfmkNnFtC3kY2LVi4M';
const TRONSCAN_API = 'https://apilist.tronscan.org/api/transaction-info?hash='; // example, may change
// Better: use TronGrid API (requires key) or TronWeb with full node.

app.post('/api/verify-trx', async (req, res) => {
  const { txid } = req.body;
  if(!txid) return res.status(400).json({ ok:false, error:'no txid' });

  try{
    // Example naive check using tronscan (for production use TronGrid / TronWeb)
    const url = TRONSCAN_API + encodeURIComponent(txid);
    const info = await axios.get(url);
    // NOTE: this endpoint may have different structure. This is a scaffold example.
    const data = info.data;
    // parse: determine to/from/amount...
    const to = (data.toAddress || data.ownerAddress || '').trim();
    const from = (data.ownerAddress || '').trim();
    // placeholder amount parsing -> in production parse token transfers for TRC20 USDT
    const amount = 0;

    // For scaffold: mark tx pending and ask admin to confirm
    db.run('INSERT OR IGNORE INTO txs(txid, from_addr, to_addr, amount, status) VALUES(?,?,?,?,?)', [txid, from, to, amount, 'pending'], function(err){
      if(err) return res.json({ ok:false, error: err.message });
      return res.json({ ok:true, message: 'Tx recorded for manual verification' });
    });
  }catch(err){
    return res.json({ ok:false, error: err.toString() });
  }
});

// Example endpoint to credit tx after verification (admin action)
// Will update user balances once admin confirms that tx was valid and to TRC20_ADDRESS
app.post('/api/admin/confirm-tx', (req, res) => {
  const { txid, credit } = req.body;
  if(!txid) return res.status(400).json({ ok:false, error:'no txid' });

  // find tx, update status and credit a user (demo: credit to user id 1)
  db.get('SELECT * FROM txs WHERE txid = ?', [txid], (err, row) => {
    if(err) return res.json({ ok:false, error: err.message });
    if(!row) return res.json({ ok:false, error:'tx not found' });

    db.run('UPDATE txs SET status = ? WHERE txid = ?', ['confirmed', txid], function(err2){
      if(err2) return res.json({ ok:false, error: err2.message });
      // For demo: credit to a user (TODO: map tx to a user via provided telegram_id in UI)
      const userId = 1;
      const creditVal = credit || 5000;
      db.run('UPDATE users SET balance = balance + ? WHERE id = ?', [creditVal, userId], function(err3){
        if(err3) return res.json({ ok:false, error: err3.message });
        return res.json({ ok:true, message:'credited' });
      });
    });
  });
});

// simple user-info endpoint (for frontend demo)
app.get('/api/user-info', (req, res) => {
  // demo returns first user or default
  db.get('SELECT * FROM users LIMIT 1', [], (err,row)=>{
    if(err) return res.json({ ok:false, error: err.message });
    if(!row) return res.json({ ok:true, balance: 0, username: 'guest' });
    return res.json({ ok:true, balance: row.balance, username: row.username });
  });
});

// more endpoints: /withdraw (create withdraw request), /telegram-auth (store user after verifying initData)...

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server listening on', PORT));
