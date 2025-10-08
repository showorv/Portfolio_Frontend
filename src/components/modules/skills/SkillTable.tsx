
"use client"


import { deleteBlog, getBlog } from '@/actions/getBlog'
import { deleteProject, getProject } from '@/actions/getProject'
import { deleteSkill, getSkill } from '@/actions/getSKill'
import { createProject } from '@/actions/projectCreate'
import { skillCreate } from '@/actions/skillCreate'
import { Button } from '@/components/ui/button'
import { IBlogs } from '@/types/blogTypes'
import { IProject } from '@/types/projectTypes'
import { ISkill } from '@/types/skillTypes'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function SkillTable() {



const [skill, setSkill] = useState<ISkill[]>([]);

const [totalPages, setTotalPages] = useState(1);


const fetchSkill = async () => {
    try {
      const res = await getSkill()
      const { data, metaData } = res;
      setSkill(data)
      setTotalPages(res.metaData?.total || 0)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchSkill()
  }, [])


    const  handleDeleteBook=async (id: string)=>{
        if(window.confirm("Are you sure to delete this skill?")){

          const res = await deleteSkill(id);

          if (res.success) {
            toast.success(res.message);
           fetchSkill()
           
          } else {
            toast.error(res.message);
          }
           
        }
       

    }
    const handleAddProject = async (newData:any) => {
        await skillCreate(newData)
        fetchSkill() 
      }
    
  return (
    <div className='max-w-7xl mx-auto p-6 min-h-screen'>
    <div className='flex justify-between items-center mb-6'>
    <h2 className='text-md md:text-2xl font-bold '>All Project</h2>
    <p>Total: {totalPages}</p>
    </div>
    <div className='overflow-x-auto shadow-md shadow-white sm:rounded '>
        <table className='min-w-full text-left text-gray-200'>
            <thead className='bg-gray-600 text-xs uppercase text-gray-200'>
                <tr>
                    <th className='py-2 px-4'>Name</th>
                    <th className='py-2 px-4'>Thumbnail</th>
                    <th className='py-2 px-4'>Category</th>
                    <th className='py-2 px-4'>Action</th>
                    
                </tr>
            </thead>

            <tbody>
                {skill.length>0?
                (
                  skill.map((product: ISkill)=>{
                        return(
                            <tr key={product._id}
                            className='border-b hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer' >
                                <td className='py-2 px-4 font-medium text-gray-950 dark:text-gray-200 whitespace-nowrap'>{product.name}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'> 
                                 <a href={product.thumbnail} target="_blank" rel="noopener noreferrer">
                                    <img
                                      src={product.thumbnail}
                                      alt={product.name || "skill Thumbnail"}
                                      className="w-16 h-16 object-cover rounded-md hover:opacity-80 transition"
                                    />
                                  </a>
                                </td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.category?product.category: "N/A"}</td>
                                
                                {/* <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.isPublished? "Yes": "No"}</td> */}
                                <td className='py-2 px-4 flex gap-2 text-gray-950 dark:text-gray-200'>
                                   
                                 {/* <UpdateBook book={product}/> */}
                                    <Button className='cursor-pointer hover:scale-50' variant={'outline'} onClick={()=> handleDeleteBook(product._id as string)}><Trash2 className='text-red-500'/></Button>
                                
                               
                                </td>
                                
                            </tr>
                        )
                    })
                ):(
                    <tr>
                        <td colSpan={8} className='p-2 text-center text-gray-200'>No skill avaiable</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>


</div>
  )
}
