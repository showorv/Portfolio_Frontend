"use client"

import { useForm } from "react-hook-form"
import {  z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,

  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import Upload from "@/components/shared/Upload"
import { useState } from "react"
import { createProject } from "@/actions/projectCreate"
import { skillCreate } from "@/actions/skillCreate"




const skillFormSchema = z.object({
    name: z
    .string()
    .trim().optional(),
    

   
    thumbnail: z.string().optional(),

     category: z
    .string().optional(),
    



})

export function SkillForm() {

    const router = useRouter()
    const [image, setImage] = useState(null)


    const form = useForm<z.infer<typeof skillFormSchema>>({
        defaultValues: {
            name: "",
            
            category: "",
       
           
        },
    })


    const onSubmit = async (values: z.infer<typeof skillFormSchema>)=>{

        const formData = new FormData()

        formData.append("name", values.name || "");
        formData.append("category", values.category || "");
        
        
        if (image) {
            formData.append("file", image); 
          }

          const toastid = toast.loading("skill is creating")
        try {
            const res = await skillCreate(formData)

            if(res.success){
                toast.success("skill created successfully", {id:toastid})

                form.reset({
                    name: "",
                    category: "",
                  });
            
                 
                  setImage(null);
                
            }else {
                toast.error(res?.message || "skill creation failed!", { id: toastid });
              }
        } catch (error) {
            toast.error("failed")
            console.log(error);
            
        }
     
        
    }

  return (
    <div className="flex justify-center items-center bg-muted-background min-h-screen ">
    <div className="space-y-6 w-full max-w-md p-8 rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center ">Add SKill</h2>

         
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="skill name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         
         <Upload onChange = {setImage}/>


      

        <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="eg:frontend "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        





          <Button type="submit" className="w-full mt-2 cursor-pointer">
            Create
          </Button>

        </form>
      </Form>
  
    </div>
  </div>
  )
}