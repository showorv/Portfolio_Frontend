"use client"


import { Button } from '@/components/ui/button'
import { IBlogs } from '@/types/blogTypes'
import { Trash2 } from 'lucide-react'
import React from 'react'

export default async function BlogTable() {


    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blog`, {
        next: {
            revalidate: 30
        }
      })
      
    
      const {data:blogs} = await res.json()

  


    const  handleDeleteBook=(id: string)=>{
        if(window.confirm("Are you sure to delete this user?")){
        
           
        }
       

    }
  return (
    <div className='max-w-7xl mx-auto p-6 min-h-screen'>
    <div className='flex justify-between items-center mb-6'>
    <h2 className='text-md md:text-2xl font-bold '>All Blogs</h2>
   
    </div>
    <div className='overflow-x-auto shadow-md shadow-white sm:rounded '>
        <table className='min-w-full text-left text-gray-200'>
            <thead className='bg-gray-600 text-xs uppercase text-gray-200'>
                <tr>
                    <th className='py-2 px-4'>Title</th>
                    <th className='py-2 px-4'>Thumbnail</th>
                    <th className='py-2 px-4'>Content</th>
                    <th className='py-2 px-4'>Tags</th>
                    <th className='py-2 px-4'>Category</th>
                    <th className='py-2 px-4'>Views</th>
                    <th className='py-2 px-4'>IsPublished</th>
                    <th className='py-2 px-4'>Actions</th>
                </tr>
            </thead>

            <tbody>
                {blogs.length>0?
                (
                  blogs.map((product: IBlogs)=>{
                        return(
                            <tr key={product._id}
                            className='border-b hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer' >
                                <td className='py-2 px-4 font-medium text-gray-950 dark:text-gray-200 whitespace-nowrap'>{product.title}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>  <a href={product.thumbnail} target="_blank" rel="noopener noreferrer">
    <img
      src={product.thumbnail}
      alt={product.title || "Project Thumbnail"}
      className="w-16 h-16 object-cover rounded-md hover:opacity-80 transition"
    />
  </a></td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.content}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.tags}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.category}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.views}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.isPublished? "Yes": "No"}</td>
                                <td className='py-2 px-4 flex gap-2 text-gray-950 dark:text-gray-200'>
                                   
                                 {/* <UpdateBook book={product}/>
                                    <Button className='cursor-pointer hover:scale-50' variant={'outline'} onClick={()=> handleDeleteBook(product._id)}><Trash2 className='text-red-500'/></Button>
                                 */}
                               
                                </td>
                                
                            </tr>
                        )
                    })
                ):(
                    <tr>
                        <td colSpan={7} className='p-2 text-center text-gray-200'>No books avaiable</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>

    {/* <div className="flex justify-center items-center gap-4 mt-6">
    <Button
      variant="outline"
      disabled={page === 1}
      onClick={() => setPage((prev) => prev - 1)}
    >
      Previous
    </Button>
    <span className="text-black dark:text-white text-sm md:text-md">
      Page {page} of {totalPage}
    </span>
    <Button
      variant="outline"
      disabled={page === totalPage}
      onClick={() => setPage((prev) => prev + 1)}
    >
      Next
    </Button>
  </div> */}

</div>
  )
}
