import { updateBlog } from "@/actions/getBlog";
import Upload from "@/components/shared/Upload";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroupItem } from "@/components/ui/radio-group";

import { Textarea } from "@/components/ui/textarea";
import { IBlogs } from "@/types/blogTypes";
import { RadioGroup } from "@radix-ui/react-radio-group";


import { Edit2 } from "lucide-react";



import { useEffect, useState } from "react";

import { useForm} from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface update{
    blog:IBlogs
}


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

export function UpdateBlog({blog}:update) {


  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null)

  const form = useForm<z.infer<typeof blogFormSchema>>({
 
        defaultValues: {
            title: "",
            
            content: "",
       
            category:",",
            isPublished: true
          },
        
    
  });

  useEffect(() => {
    form.reset({
      title: blog?.title,
      content: blog?.content,
      thumbnail: blog?.thumbnail,
      category: blog?.category,
      tags: blog?.tags?.join(", ") || "",
      isPublished: blog?.isPublished,
    });
  }, [blog, form]);
 

  const onSubmit= async (values: z.infer<typeof blogFormSchema>) => {
   
    const formData = new FormData()

    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category || "");
    formData.append("isPublished", String(values.isPublished));
    formData.append("tags", values.tags?.split(",").map(t => t.trim()).join(",") || "");
    if (image) {
        formData.append("file", image); 
      }

      const toastid = toast.loading("Blog is updating")
    try {
        const res = await updateBlog(blog._id as string,formData)

        if(res.success){
            toast.success("blog updated successfully", {id:toastid})

              setOpen(false);
             
              setImage(null);
            
        }else {
          toast.error(res?.message || "blog creation failed!", { id: toastid });
        }
    } catch (error) {
        toast.error("failed")
        console.log(error);
        
    }

 
  };




  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=' cursor-pointer hover:scale-50' variant={'outline'}><Edit2 className='text-yellow-500'/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update your book</DialogTitle>
          <DialogDescription>change the field</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mt-5 cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="mt-5 cursor-pointer">
               Update Book
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
