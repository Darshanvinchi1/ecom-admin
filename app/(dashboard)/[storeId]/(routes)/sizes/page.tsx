import React from 'react'
import prismadb from '@/lib/prismadb'
import { SizesCloumn } from './components/columns'
import { format } from 'date-fns';
import SizesClient from './components/client';

const SizesPage = async ({
  params
}:{
  params: { storeId: string }
}) => {

  const sizes = await prismadb.size.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedSizes: SizesCloumn[] = sizes.map((items) => ({
    id: items.id,
    name: items.name,
    value: items.value,
    createdAt: format(items.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizesClient data={formattedSizes} />
        </div>
    </div>
  )
}

export default SizesPage