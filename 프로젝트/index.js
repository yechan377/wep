const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

// JSON 파일 읽어서 JS 객체로 변환
const responses = JSON.parse(fs.readFileSync("responses.json", "utf-8"));

app.post("/webhook", (req, res) => {
  const params = req.body.queryResult.parameters;
  const genre = params.genre.toLowerCase(); // "2d" 또는 "3d"
  const mood = params.mood;                 // 예: "공포", "감성"

  let reply = "장르와 분위기를 정확히 말해줘!";
  if (responses[genre] && responses[genre][mood]) {
    reply = responses[genre][mood];
  } else if (responses[genre]) {
    reply = `${genre.toUpperCase()} 장르에 맞는 분위기를 선택해줘!`;
  }

  return res.json({ fulfillmentText: reply });
});

app.listen(3000, () => console.log("Server is running on port 3000"));
