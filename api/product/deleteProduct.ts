import { Product } from "../../models/Product";
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
  if (req.method === "DELETE") {
    const { productId } = req.query;

    if(!productId) {
      return 'Inválido';
    }

    await Product.findByIdAndRemove(productId);

    res.status(204).json({ message: 'No-Body'});
  } else {
    res.status(500);
  }

  mongoose.connection.close();
};