import type { VercelRequest, VercelResponse } from '@vercel/node';

export default (req: VercelRequest, res: VercelResponse) => {  
  res.status(200).send('APIRest Casa DArtes');
};

