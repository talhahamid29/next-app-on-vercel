import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('request object id is', req.query.id);
    console.log('request object productCategory is', req.body.productCategoryModal);

    // Define updateData object with indexed type signature to allow any property
    const updateData: { [key: string]: any } = {};

    if (req.body.productCategoryModal !== '') {
      updateData.productCategory = req.body.productCategoryModal;
    }

    if (req.body.productNameModal !== '') {
      updateData.productName = req.body.productNameModal;
    }

    if (req.body.serialNumberModal !== null) {
      updateData.serialNumber = req.body.serialNumberModal;
    }

    if (req.body.priceModal !== null) {
      updateData.price = req.body.priceModal;
    }

    const result = await prisma.product2.update({
      where: { id: parseInt(req.query.id as string) },
      data: updateData,
    });

    res.status(200).json(result);

  } catch (error) {
    console.error('Error during product updation:', error);
    res.status(500).json({ success: false, error: 'Failed to update product' });
  }
}
