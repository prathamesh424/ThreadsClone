
"use client";

import * as z from "zod";
 import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
 import { Button } from "@/components/ui/button";
import { ThreadValidation } from "@/lib/validations/thread";
import { Textarea } from "../ui/textarea";
import {createThread} from "@/lib/actions/thread.actions";



interface Props { 
  userId: string;
}

   
function PostThread ({userId} : Props) {
  const router = useRouter();
  const pathname = usePathname();   
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
       thread: '' ,
       accountId : userId
    },
  })

  const  onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
      await createThread({
          text: values.thread ,
          author : userId,
          communityId : null ,
          path : pathname
      })  ;
      router.push('/');
  }
    return (
        <Form {...form}>
        <form
           onSubmit={form.handleSubmit(onSubmit)}
          className=' mt-10 flex flex-col justify-start gap-10'
         > 

<FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4  bg-dark-3 text-light-1">
                <Textarea
                   rows={16}
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
            Post Thread
        </Button>
        </form>
        </Form>
         
    
    )
}


export default PostThread ;