import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Use Prisma context here
    const products = await prisma.product2.findMany();

    // Return the products as a JSON response
    res.status(200).json(products);
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
