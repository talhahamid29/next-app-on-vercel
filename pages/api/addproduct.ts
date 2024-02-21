import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export default async function handler(req: NextRequest, res: NextResponse) {
  try {
    // Ensure that the content type is application/json
    if (req.headers.get('content-type')?.includes('application/json')) {
      // Parse the JSON body
      const body = await req.json();

      if (body && body.productCategory) {
        console.log('request object is', body.productCategory);
        // Continue with your code
      } else {
        console.log('Request body or productCategory is null or undefined.');
      }

      const result = await prisma.product2.create({
        data: {
          productCategory: body.productCategory,
          productName: body.productName,
          serialNumber: body.serialNumber,
          price: body.price
        }
      });

      // Send a JSON response
      await res.json( );
    } else {
      // If content type is not JSON, send an error response
      throw new Error('Content type is not application/json');
    }
  } catch (error) {
    console.error('Error during product addition:', error);
    // Send an error response
    await res.json( );
  }
}
