import { Artist } from "../../models/Artist";
import type { VercelRequest, VercelResponse } from "@vercel/node";

import "dotenv/config";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}`
  )
  .then(() => console.log("Conexão estabelecida"))
  .catch(() => console.log("Erro ao conectar ao MongoDB"));

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } else {
    res.status(500);
  }

  mongoose.connection.close();
};
