
"use client"


import { deleteBlog, getBlog } from '@/actions/getBlog'
import { deleteProject, getProject } from '@/actions/getProject'
import { createProject } from '@/actions/projectCreate'
import { Button } from '@/components/ui/button'
import { IBlogs } from '@/types/blogTypes'
import { IProject } from '@/types/projectTypes'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'


import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function ProjectTable() {


const [project, setProject] = useState<IProject[]>([]);

const [totalPages, setTotalPages] = useState(1);


const router = useRouter()


const fetchProjects = async () => {
    try {
      const res = await getProject()
      const { data, metaData } = res;
      setProject(data)
      setTotalPages(res.metaData?.total || 0)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])




    const  handleDeleteBook=async (id: string)=>{
        if(window.confirm("Are you sure to delete this user?")){

          const res = await deleteProject(id);

          if (res.success) {
            toast.success(res.message);
           fetchProjects()
           
          } else {
            toast.error(res.message);
          }
           
        }
       

    }
    const handleAddProject = async (newData:any) => {
        await createProject(newData)
        fetchProjects() 
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
                    <th className='py-2 px-4'>Title</th>
                    <th className='py-2 px-4'>Thumbnail</th>
                    <th className='py-2 px-4'>Project Link</th>
                    <th className='py-2 px-4'>Live Link</th>
                    <th className='py-2 px-4'>Description</th>
                    <th className='py-2 px-4'>Features</th>
                    <th className='py-2 px-4'>Tech Stacks</th>
                    <th className='py-2 px-4'>Actions</th>
                </tr>
            </thead>

            <tbody>
                {project.length>0?
                (
                  project.map((product: IProject)=>{
                        return(
                            <tr key={product._id}
                            className='border-b hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer' >
                                <td className='py-2 px-4 font-medium text-gray-950 dark:text-gray-200 whitespace-nowrap'>{product.title}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'> 
                                 <a href={product.thumbnail} target="_blank" rel="noopener noreferrer">
                                    <img
                                      src={product.thumbnail}
                                      alt={product.title || "Project Thumbnail"}
                                      className="w-16 h-16 object-cover rounded-md hover:opacity-80 transition"
                                    />
                                  </a>
                                </td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.liveSite?product.liveSite: "N/A"}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.projectLink? product.projectLink : "N/A"}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{product.description}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'> {Array.isArray(product.features) ? product.features.join(", ") : product.features}</td>
                                <td className='py-2 px-4 text-gray-950 dark:text-gray-200'>{Array.isArray(product.techStacks)? product.techStacks.join(","): product.techStacks}</td>
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
                        <td colSpan={8} className='p-2 text-center text-gray-200'>No books avaiable</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>


</div>
  )
}
