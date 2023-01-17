import { Artist } from './../../models/Artist';
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
  if (req.method === "POST") {
    const { name, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }
    if(!icon) {
      return res.status(400).json({
        error: 'Icon is required'
      });
    }

    const artist = await Artist.create({ name, icon });

    res.status(201).json(artist);
  } else {
    res.status(500);
  } 

  mongoose.connection.close();
};
