import { config } from "dotenv";

import express from "express";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "./router/router";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";

config({ path: "./config/.env" });

const { PORT, DB_URL, CLIENT_URL } = process.env as {
	PORT: string;
	DB_URL: string;
	CLIENT_URL: string;
};

const app = express();

app.use(
	cors({
		credentials: true,
		origin: CLIENT_URL,
		allowedHeaders: "Content-Type"
	})
);

app.use(cookieParser());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(DB_URL);

		app.listen(PORT, () => {
			console.log(`Api is listening on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
};

start();
