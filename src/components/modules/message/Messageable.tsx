
"use client"

import { createMessage, getMessage } from '@/actions/message'
import { IMessage } from '@/types/messageTypes'


import React, { useEffect, useState } from 'react'

export default function MessageTable() {



const [message, setMessage] = useState<IMessage[]>([]);

const [totalPages, setTotalPages] = useState(1);


const fetchSkill = async () => {
    try {
      const res = await getMessage()
      const { data, metaData } = res;
      setMessage(data)
      setTotalPages(res.metaData?.total || 0)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSkill()
  }, [])


    const handleAddProject = async (newData:any) => {
        await createMessage(newData)
        fetchSkill() 
      }
    
  return (
    <div className='max-w-7xl mx-auto p-6 min-h-screen'>
    <div className='flex justify-between items-center mb-6'>
    <h2 className='text-md md:text-2xl font-bold '>All Message</h2>
    <p>Total: {totalPages}</p>
    </div>
    <div className='overflow-x-auto shadow-md shadow-white sm:rounded '>
        <table className='min-w-full text-left text-gray-200'>
            <thead className='bg-gray-600 text-xs uppercase text-gray-200'>
                <tr>
                    <th className='py-2 px-4'>Name</th>
                    <th className='py-2 px-4'>Email</th>
                    <th className='py-2 px-4'>Description</th>
                
                    
                </tr>
            </thead>

            <tbody>
                {message.length>0?
                (
                  message.map((product: IMessage)=>{
                        return(
                            <tr key={product._id}
                            className='border-b hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer' >
                                <td className='py-2 px-4 font-medium text-gray-950 dark:text-gray-200 whitespace-nowrap'>{product.name}</td>
                               
                            
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.email?product.email:  "N/A"}</td>
                                <td className='py-2 px-4 font-medium text-gray-950 dark:text-gray-200 whitespace-nowrap'>{product.description}</td>
                                
                                {/* <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.isPublished? "Yes": "No"}</td> */}
                             
                                
                            </tr>
                        )
                    })
                ):(
                    <tr>
                        <td colSpan={3} className='p-2 text-center text-gray-200'>No message avaiable</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>


</div>
  )
}
