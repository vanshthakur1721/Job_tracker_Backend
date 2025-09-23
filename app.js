 import express from 'express';
 import dotenv from "dotenv";
 import connectDb from './src/Db/db.js';
 import authRoutes from './src/Routes/authRoutes.js'
 import jobRoutes from './src/Routes/jobRoutes.js'
 import cors from 'cors'
 dotenv.config();
 const app = express()
const PORT = process.env.PORT || 3000;

 app.use(express.json());
 connectDb();

 app.get('/', (req, res) => {
  res.send('Hello World these side vansh!')
})
//  app.use(cors({
//   origin: ["http://localhost:5173",
//    "https://job-tracker-helper.vercel.app"], // frontend URL
//   credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"]

// }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-tracker-zeta-one.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use('/api/v1/job',jobRoutes)

app.use('/api/v1/auth',authRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})