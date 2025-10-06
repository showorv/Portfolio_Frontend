"use client"

import { FieldValues, useForm } from "react-hook-form"
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


const formSchema = z.object({
  email: z.email( {
    message: "must be valid email.",
  }),
  password:  z.string({
    message: "password not correct"
  })
})

export function LoginForm() {

    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: ""
        },
    })


    const onSubmit = async (values: z.infer<typeof formSchema>)=>{

        try {
            const res = await login(values);
           
            
        
            if (res?.success) {
              toast.success("Logged in successfully");
              router.push("/dashboard");
            } else {
              toast.error(res?.message || "Login failed");
            }
          } catch (error: any) {
            toast.error( "Invalid credentials");
            console.error(error);
          }
        
    }

  return (
    <div className="flex justify-center items-center bg-muted-background min-h-screen ">
    <div className="space-y-6 w-full max-w-md bg-muted-foreground  p-8 rounded-lg shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center ">Login</h2>

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2 cursor-pointer">
            Login
          </Button>

        </form>
      </Form>
  
    </div>
  </div>
  )
}