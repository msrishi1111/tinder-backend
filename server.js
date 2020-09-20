const express = require("express");
const mongoose = require("mongoose");
const Cards = require("./dbCards");
const cors= require("cors");
const app = express();
const port = process.env.PORT || 8001;
const connection_url = 'mongodb+srv://admin:rax9826253676@cluster0.qg28m.mongodb.net/tinderdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((res)=>{

}).catch((e)=>{
console.log(e)
})

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.status(200).send("Hello people")
})
app.post('/tinder/cards', (req, res) => {
  dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(201).send(data);
    }
  })
})
app.get('/tinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(data);
    }
  })
})
app.listen(port, () => {
  console.log(`I m listining at ${port}`)
})