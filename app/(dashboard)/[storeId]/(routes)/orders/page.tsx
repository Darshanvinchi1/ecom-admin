import React from 'react'
import prismadb from '@/lib/prismadb'
import { OrderColumn } from './components/columns'
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import OrderClient from './components/client';

const OrdersPage = async ({
  params
}:{
  params: { storeId: string }
}) => {

  const orders = await prismadb.order.findMany({
    where:{
      storeId: params.storeId
    },
    include:{
      orderItems:{
        include:{
          product: true
        }
      }
    },
    orderBy:{
      createdAt:'desc'
    }
  });

  const formattedOrders: OrderColumn[] = orders.map((items) => ({
    id: items.id,
    phone: items.phone,
    address: items.address,
    products: items.orderItems.map((orderitem) => orderitem.product.name).join(', '),
    totalPrice: formatter.format(items.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    },0)),
    isPaid: items.isPaid,
    createdAt: format(items.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <OrderClient data={formattedOrders} />
        </div>
    </div>
  )
}

export default OrdersPage