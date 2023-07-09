import React from 'react'
import ProductClient from './components/client'
import prismadb from '@/lib/prismadb'
import { ProductColumn } from './components/columns'
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';

const ProductsPage = async ({
  params
}:{
  params: { storeId: string }
}) => {

  const products = await prismadb.product.findMany({
    where:{
      storeId: params.storeId
    },
    include:{
      category: true,
      size: true,
      color: true,
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedProducts: ProductColumn[] = products.map((items) => ({
    id: items.id,
    name: items.name,
    isFeatured: items.isFeatured,
    isArchived: items.isArchived,
    price: formatter.format(items.price.toNumber()),
    category: items.category.name,
    size: items.size.name,
    color: items.color.value,
    createdAt: format(items.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ProductClient data={formattedProducts} />
        </div>
    </div>
  )
}

export default ProductsPage