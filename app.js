import "dotenv/config";
import express from 'express';
import Hello from "./hello.js";
import Lab5 from "./lab5.js";
import CourseRoutes from "./courses/routes.js";
import cors from "cors";
import ModuleRoutes from "./modules/routes.js";
const app = express();
Hello(app);
app.use(cors);
// app.use(
//     cors({
//       credentials: true,
//       origin: process.env.FRONTEND_URL
//   }) );
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000);