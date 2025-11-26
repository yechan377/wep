const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

// JSON 데이터 불러오기
const responses = JSON.parse(fs.readFileSync("responses.json", "utf-8"));

// Render 포트 환경변수
const PORT = process.env.PORT || 3000;

// Webhook endpoint
app.post("/webhook", (req, res) => {
  const params = req.body.queryResult.parameters;
  const genre = params.genre.toLowerCase(); // 2d / 3d
  const mood = params.mood;                 // 공포, 감성 등

  let reply = "장르와 분위기를 정확히 말해줘!";
  if (responses[genre] && responses[genre][mood]) {
    reply = responses[genre][mood];
  } else if (responses[genre]) {
    reply = `${genre.toUpperCase()} 장르에 맞는 분위기를 선택해줘!`;
  }

  return res.json({ fulfillmentText: reply });
});

// 서버 시작
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
