import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import mongoose from "mongoose";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

mongoose.connect(
  "mongodb://admin:mongo123@ac-e85t195-shard-00-00.rzm9aia.mongodb.net:27017,ac-e85t195-shard-00-01.rzm9aia.mongodb.net:27017,ac-e85t195-shard-00-02.rzm9aia.mongodb.net:27017/?ssl=true&replicaSet=atlas-twp6sm-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const Schema = mongoose.Schema;

const videoMetricsSchema = new Schema({
  views: Number,
  likes: Number,
  comments: Number,
  formattedDate: String,
  title: String,
  thumbnail: String,
  earnings: Number,
  ID: { type: String, unique: true, required: true },
});

const VideoMetrics = mongoose.model("VideoMetrics", videoMetricsSchema);

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
    const title = videoData.items[0].snippet.localized.title;
    const dateString = videoData.items[0].snippet.publishedAt;
    const thumbnail = videoData.items[0].snippet.thumbnails.standard.url;
    const ID = videoID;

    const formattedDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      const formattedDate = new Date(dateString).toLocaleDateString(
        undefined,
        options
      );
      return formattedDate;
    };

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
    const responseData = {
      views,
      likes,
      comments,
      formattedDate: formattedDate(dateString),
      title,
      thumbnail,
      ID,
      earnings: earnings(subscribers, views, comments, likes),
    };

    const videoMetrics = new VideoMetrics(responseData);
    await videoMetrics.save();

    res.status(200).json(responseData);
  } catch (err) {
    console.error("Error in post request:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

app.get("/api/getVideoMetrics", async (req, res) => {
  try {
    const videoMetrics = await VideoMetrics.find().sort({ earnings: -1 });
    res.status(200).json(videoMetrics);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: err.message });
  }
});

app.get("/api/videoMetrics", async (req, res) => {
  res.send({});
});

app.post("/sendEmail", (req, res) => {
  const { name, number, preferredTime, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: "nikagodzoro@gmail.com",
      pass: "mwde fyeq dczd cmce",
    },
  });

  const mailOptions = {
    from: "nikagodzoro@gmail.com",
    to: "ravi@anchors.in",
    subject: "Call Back Request",
    text: `My Name is ${name} and my number is ${number} , Give a Call at ${preferredTime} , ${message} `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email Sent Successfully");
    }
  });
});

app.listen(PORT, () => console.log(`Server is running at ${PORT} `));
