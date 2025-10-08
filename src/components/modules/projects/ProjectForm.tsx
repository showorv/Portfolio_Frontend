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




const projectFormSchema = z.object({
    title: z
    .string({ message: "Title is required" })
    .trim()
    .min(2, "Title must be at least 2 characters"),

   
    thumbnail: z.string().optional(),

     description: z
    .string({ message: "Content is required" }).min(10,"description must be min 10"),
    


    projectLink: z
    .url().optional(),

    liveSite: z
    .url().optional(),
  


    features: z.string().optional() ,


    techStacks: z.string().optional(),


})

export function ProjectForm() {

    const router = useRouter()
    const [image, setImage] = useState(null)


    const form = useForm<z.infer<typeof projectFormSchema>>({
        defaultValues: {
            title: "",
            
            description: "",
       
            liveSite:",",
            projectLink:","
           
        },
    })


    const onSubmit = async (values: z.infer<typeof projectFormSchema>)=>{

        const formData = new FormData()

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("liveSite", values.liveSite || "");
        formData.append("projectLink", values.projectLink || "");
        formData.append("features", values.features?.split(",").map(t => t.trim()).join(",") || "");
        formData.append("techStacks", values.techStacks?.split(",").map(t => t.trim()).join(",") || "");
        
        if (image) {
            formData.append("file", image); 
          }

          const toastid = toast.loading("Project is creating")
        try {
            const res = await createProject(formData)

            if(res.success){
                toast.success("project created successfully", {id:toastid})

                form.reset({
                    title: "",
                    description: "",
                    projectLink: "",
                    liveSite: "",
                    features: "",
                    techStacks: "",
                    thumbnail: "",
                  });
            
                 
                  setImage(null);
                
            }else {
                toast.error(res?.message || "Project creation failed!");
              }
        } catch (error:any) {
            toast.error("failed",error.message)
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
          <h2 className="text-3xl font-bold text-center ">Create Project</h2>

         
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="write the project title"
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    
                    placeholder="write the description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="eg: next,react"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="techStacks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tech Stacks</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="eg: next,react"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="projectLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder=""
                    
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="liveSite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Live Site</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder=""

                 
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