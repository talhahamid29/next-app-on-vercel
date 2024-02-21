import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('request object is', req.query.id);

    const result = await prisma.product2.delete({
      where: { id: parseInt(req.query.id as string) }
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error during product deletion:', error);
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
}
