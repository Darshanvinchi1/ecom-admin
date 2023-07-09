import React from 'react'
import prismadb from '@/lib/prismadb'
import { ColorCloumn } from './components/columns'
import { format } from 'date-fns';
import ColorsClient from './components/client';

const ColorsPage = async ({
  params
}:{
  params: { storeId: string }
}) => {

  const colors = await prismadb.color.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedColors: ColorCloumn[] = colors.map((items) => ({
    id: items.id,
    name: items.name,
    value: items.value,
    createdAt: format(items.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <ColorsClient data={formattedColors} />
        </div>
    </div>
  )
}

export default ColorsPage