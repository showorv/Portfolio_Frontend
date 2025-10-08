import { updateBlog } from "@/actions/getBlog";
import { updateProject } from "@/actions/getProject";
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
import { IProject } from "@/types/projectTypes";
import { RadioGroup } from "@radix-ui/react-radio-group";


import { Edit2 } from "lucide-react";



import { useEffect, useState } from "react";

import { useForm} from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface update{
    project:IProject
}

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

export function UpdateProject({project}:update) {


  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null)

  const form = useForm<z.infer<typeof projectFormSchema>>({
 
        defaultValues: {
            title: "",
            
            description: "",
       
            liveSite:",",
            projectLink:","
          },
        
    
  });

  useEffect(() => {
    form.reset({
      title: project?.title,
      description: project?.description,
      thumbnail: project?.thumbnail,
      liveSite: project?.liveSite,
      projectLink: project?.projectLink,
      features: project?.features?.join(", ") || "",
      techStacks: project?.techStacks?.join(", ") || "",
     
    });
  }, [project, form]);
 

  const onSubmit= async (values: z.infer<typeof projectFormSchema>) => {
   
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

      const toastid = toast.loading("Blog is updating")
    try {
        const res = await updateProject(project._id as string,formData)

        if(res.success){
            toast.success("project updated successfully", {id:toastid})

              setOpen(false);
             
              setImage(null);
            
        }else {
          toast.error(res?.message || "project creation failed!", { id: toastid });
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
