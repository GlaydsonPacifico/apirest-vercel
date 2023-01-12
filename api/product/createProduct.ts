import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProduct(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, artist } = req.body;

    if(!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }
    if(!description) {
      return res.status(400).json({
        error: 'Description is required'
      });
    }
    if(!price) {
      return res.status(400).json({
        error: 'Price is required'
      });
    }
    if(!artist) {
      return res.status(400).json({
        error: 'Artist is required'
      });
    }
    if(!imagePath) {
      return res.status(400).json({
        error: 'Image is required'
      });
    }




    const product = await Product.create({
      name,
      description,
      imagePath,
      price: Number(price),
      artist,
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
