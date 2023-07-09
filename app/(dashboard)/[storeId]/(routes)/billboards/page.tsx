import React from 'react'
import BillBoardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'
import { format } from 'date-fns';

const BillBoardsPage = async ({
  params
}:{
  params: { storeId: string }
}) => {

  const billboards = await prismadb.billboard.findMany({
    where:{
      storeId: params.storeId
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((items) => ({
    id: items.id,
    label: items.label,
    createdAt: format(items.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <BillBoardClient data={formattedBillboards} />
        </div>
    </div>
  )
}

export default BillBoardsPage