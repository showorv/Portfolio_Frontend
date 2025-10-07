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
import { login } from "@/actions/login"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import Upload from "@/components/shared/Upload"

import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group"
import { useState } from "react"

import { createBog } from "@/actions/createBlog"


const blogFormSchema = z.object({
    title: z
    .string({ message: "Title is required" })
    .trim()
    .min(2, "Title must be at least 2 characters"),

   
    thumbnail: z.string().optional(),

  content: z
    .string({ message: "Content is required" })
    .min(10, "Content must be at least 10 characters"),

    tags: z.string().optional() ,


  category: z.string().trim().optional(),

  isPublished: z.boolean().optional()
})

export function BlogForm() {

    const router = useRouter()
    const [image, setImage] = useState(null)


    const form = useForm<z.infer<typeof blogFormSchema>>({
        defaultValues: {
            title: "",
            
            content: "",
       
            category:",",
            isPublished: true
        },
    })


    const onSubmit = async (values: z.infer<typeof blogFormSchema>)=>{

        const formData = new FormData()

        formData.append("title", values.title);
        formData.append("content", values.content);
        formData.append("category", values.category || "");
        formData.append("isPublished", String(values.isPublished));
        formData.append("tags", values.tags?.split(",").map(t => t.trim()).join(",") || "");
        if (image) {
            formData.append("file", image); 
          }

          const toastid = toast.loading("Blog is creating")
        try {
            const res = await createBog(formData)

            if(res.success){
                toast.success("blog created successfully", {id:toastid})

                form.reset({
                    title: "",
                    content: "",
                    category: "",
                    tags: "",
                    isPublished: true,
                    thumbnail: "",
                  });
            
                 
                  setImage(null);
                
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
          <h2 className="text-3xl font-bold text-center ">Create Blog</h2>

         
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="write the blog title"
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
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    
                    placeholder="write the content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Blog category"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

<FormField
  control={form.control}
  name="isPublished"
  render={({ field }) => (
    <FormItem className="space-y-3">
      <FormLabel>Publish Status</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={(value) => field.onChange(value === "true")}
          value={field.value === true ? "true" : "false"}
          className="flex flex-col space-y-2"
        >
          <label className="flex items-center space-x-3 cursor-pointer ">
            <RadioGroupItem value="true"  className="w-5 h-5 rounded-full border border-gray-400 bg-white
                         data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500
                         transition-colors"/>
            <span className="font-normal">Published</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <RadioGroupItem value="false" className="w-5 h-5 rounded-full border border-gray-400 bg-white
                         data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500
                         transition-colors" />
            <span className="font-normal">Unpublished</span>
          </label>
        </RadioGroup>
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