import { Product } from "../../models/Product";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`
  )
  .then(() => {
    const app = express();
    const port = process.env.PORT;

    app.use(express.json());
    app.listen(port, () => console.log(`🚀 Server is running on ${port}`));
  })
  .catch(() => console.log("Erro ao conectar ao MongoDB"));

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    const products = await Product.find();
    res.status(200).json(products);
  } else {
    res.status(500);
  }
};
