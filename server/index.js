import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://admin:mongo123@cluster0.npb0l7b.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const videoMetricsSchema = new mongoose.Schema({
  link: String,
  views: Number,
  likes: Number,
  comments: Number,
  subscribers: Number,
  earnings: Number,
});

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

    const videoMetric = new VideoMetric({
      link: link,
      views: views,
      likes: likes,
      comments: comments,
      subscribers: subscribers,
      earnings: earnings(subscribers, views, comments, likes),
    });
    const VideoMetric = mongoose.model("VideoMetric", videoMetricsSchema);

    await videoMetric.save();

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

app.get("/api/videoMetrics", async (req, res) => {
  try {
    // Retrieve data from MongoDB
    const VideoMetric = mongoose.model("VideoMetric", videoMetricsSchema);

    const videoMetrics = await VideoMetric.find();
    res.status(200).json(videoMetrics);
  } catch (err) {
    console.error("Error in get request:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running at ${PORT} `));
