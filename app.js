import "dotenv/config";
import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import ModuleRoutes from "./modules/routes.js";
import session from 'express-session';
import MongoStore from "connect-mongo";
const DB_CONNECTION_STRING = 'mongodb://sean:sean123@ac-la5nrbf-shard-00-00.l8crz4b.mongodb.net:27017,ac-la5nrbf-shard-00-01.l8crz4b.mongodb.net:27017,ac-la5nrbf-shard-00-02.l8crz4b.mongodb.net:27017/kanbas?replicaSet=atlas-phooid-shard-0&ssl=true&authSource=admin';
const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
// const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Additional event handlers for monitoring
db.on('reconnected', () => {
  console.log('Reconnected to MongoDB');
});

db.on('close', () => {
  console.log('Connection to MongoDB closed');
});

// Check connection status using Mongoose's readyState
if (mongoose.connection.readyState === 1) {
  console.log('Mongoose is connected to MongoDB');
} else {
  console.log('Mongoose is not connected to MongoDB');
}

const app = express();
Hello(app);
// app.use(cors);
app.use(
    cors({
      credentials: true,
      origin: process.env.FRONTEND_URL,
  }) );
  const sessionOptions = {
    secret: 'any string',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION_STRING,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native' 
    })
  }
  if (process.env.NODE_ENV !== 'development') {
    app.set('trust proxy', 1) // trust first proxy
    sessionOptions.proxy = true
    sessionOptions.cookie = {
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    }
  }
  app.use(session(sessionOptions))
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);