import { NextApiRequest, NextApiResponse } from 'next'; // Import the correct request type
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('request object id is', req.query.id);
    console.log('request object productCategory is', req.body.productCategoryModal);

    const result = await prisma.product2.update({
      where: { id: parseInt(req.query.id as string) },
      data: {
        productCategory: req.body.productCategoryModal,
        productName: req.body.productNameModal,
        serialNumber: req.body.serialNumberModal,
        price: req.body.priceModal
      }
    });

    res.status(200).json(result);

  } catch (error) {
    console.error('Error during product updation:', error);
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
}
