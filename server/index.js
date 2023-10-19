import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/videoMetrics", async (req, res) => {
  try {
    const link = req.body.link;
    const videoID = link.match(/[?&]v=([a-zA-Z0-9_-]{11})/)[1];
    const API_KEY = "AIzaSyCR4S_IZVuE8_dp99WQta1XZNsTEm8vw_U";
    const videoResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoID}&key=${API_KEY}`
    );

    const videoData = await videoResponse.json();

    const views = videoData.items[0].statistics.viewCount;
    const likes = videoData.items[0].statistics.likeCount;
    const comments = videoData.items[0].statistics.commentCount;

    const channelID = videoData.items[0].snippet.channelId;

    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${API_KEY}`
    );
    const channelData = await channelResponse.json();

    const subscribers = channelData.items[0].statistics.subscriberCount;

    const earnings = function CalculateEarnings(
      subscribers,
      views,
      comments,
      likes
    ) {
      return Math.min(subscribers, views) + 10 * comments + 5 * likes;
    };

    res.status(200).json({
      videoData: videoData,
      earnings: earnings(subscribers, views, comments, likes),
    });
  } catch (err) {
    console.error("Error in post request:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

app.get("/api/videoMetrics", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server is running at ${PORT} `));
