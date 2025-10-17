const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const TRC20 = "TWzZVoKptLx3KJfshfmkNnFtC3kY2LVi4M";
const MIN = 1000;

app.get("/api/user-info", (req,res)=>{
  db.get("SELECT * FROM users WHERE id=1", (e,row)=>{
    if(!row){
      db.run("INSERT INTO users(username,balance,total_deposited) VALUES(?,?,?)",["Guest",0,0]);
      return res.json({ok:true,balance:0,total_deposited:0,user_id:1});
    }
    res.json({ok:true,balance:row.balance,total_deposited:row.total_deposited,user_id:row.id});
  });
});

app.post("/api/verify-trx", (req,res)=>{
  const tx=req.body.txid;
  if(!tx)return res.json({ok:false,error:"No Tx"});
  // demo only
  db.run("INSERT OR IGNORE INTO txs(txid,amount,status) VALUES(?,?,?)",[tx,5000,"confirmed"],(err)=>{
    if(err)return res.json({ok:false,error:err.message});
    db.run("UPDATE users SET balance=balance+5000,total_deposited=total_deposited+5000 WHERE id=1");
    res.json({ok:true,message:"Deposit credited +5000֏"});
  });
});

app.post("/api/withdraw",(req,res)=>{
  const {user_id,amount,to_address}=req.body;
  if(!user_id||!amount||!to_address)return res.json({ok:false,error:"missing fields"});
  const amt=parseInt(amount,10);
  if(amt<MIN)return res.json({ok:false,error:`Minimum withdraw is ${MIN}֏`});

  db.get("SELECT * FROM users WHERE id=?",[user_id],(err,u)=>{
    if(err)return res.json({ok:false,error:err.message});
    if(!u)return res.json({ok:false,error:"user not found"});
    if(u.total_deposited<MIN)return res.json({ok:false,error:`Must deposit at least ${MIN}֏ before withdrawing`});
    if(u.balance<amt)return res.json({ok:false,error:"Insufficient balance"});

    db.run("INSERT INTO withdraws(user_id,amount,address) VALUES(?,?,?)",[user_id,amt,to_address]);
    db.run("UPDATE users SET balance=balance-? WHERE id=?",[amt,user_id]);
    res.json({ok:true,message:"Withdraw request created (pending review)"});
  });
});

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log("Server running on "+PORT));
