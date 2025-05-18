import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {pool} from './config/dbconfig.js';
import {handleUserSignUp} from "./controllers/user.controller.js";
import {createStore} from "./controllers/store.controller.js";
import {createReview, handleListUserReviews} from "./controllers/review.controller.js";
import { createMission } from "./controllers/mission.controller.js";
import { challengeMission } from "./controllers/mission.controller.js";
import {handleListStoreReviews} from "./controllers/store.controller.js";
import { handleListStoreMissions } from "./controllers/mission.controller.js";

try {
  const conn = await pool.getConnection(); // 연결 시도
  console.log('✅ DB 연결 성공!');

  conn.release(); // 연결 반환
} catch (err) {
  console.error('❌ DB 연결 실패:', err.message);
}



dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors()); 
app.use(express.static('public'));
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/stores",createStore);
app.post("/api/stores/:storeId/reviews",createReview);
app.post("/api/stores/:storeId/missions",createMission);
app.post("/api/missions/:missionId/challenge", challengeMission);

app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 내가 쓴 리뷰 확인하는 API 
app.get("/users/:userId/reviews", handleListUserReviews);
app.get("/stores/:storeId/missions", handleListStoreMissions);
// 특정 가게의 미션 조회해보는 API



app.get("/", (req, res) => {
  res.send("Good Luck!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
