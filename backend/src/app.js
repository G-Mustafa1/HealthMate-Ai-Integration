const express = require('express');
require('dotenv').config();

const cors = require('cors')
const cookieParser = require('cookie-parser');

const { connectDB } = require("./config/database")
const { profileRouter } = require('./router/profile');
const { authRouter } = require('./router/auth');
const { reportRouter } = require('./router/report');
const { vitalsRouter } = require('./router/vitial');

const app = express();

app.use(cors({
  origin: [process.env.CLIENT_URL], // Use environment variable or default to localhost
  credentials: true,// Allow cookies to be sent with requests
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization",],
}));


app.use(express.json());
app.use(cookieParser());

connectDB();

// app.use('/auth', authRouter);
// app.use('/profile', profileRouter);
// app.use('/report', reportRouter);
// app.use('/vitals', vitalsRouter);

app.get('/', (req, res) => {
  res.send('Backend is running 🚀')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉')
})


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});      