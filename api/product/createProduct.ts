
import { Product } from "../../models/Product";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import "dotenv/config";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`
  )
  .then(() => console.log("Conexão estabelecida"))
  .catch(() => console.log("Erro ao conectar ao MongoDB"));

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const { name, description, price, artist } = req.body;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      artist,
    });

    res.status(201).json(product);
  } else {
    res.status(500);
  } 

  mongoose.connection.close();
};
