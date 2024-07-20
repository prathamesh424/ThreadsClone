
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
import { CommentValidation} from "@/lib/validations/thread";
 import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";



interface Props {
    threadId :string ,
    currentUserImg : string
    , currentUserId: string  
}

const Comment = ({threadId , currentUserImg, currentUserId} :Props ) => {
    const router = useRouter();
    const pathname = usePathname();   
    const form = useForm<z.infer<typeof CommentValidation>>({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
         thread: '' ,
       },
    })
  
    const  onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId , values.thread, JSON.parse(currentUserId) , pathname)  ;
         form.reset() ;
    }
    return (
        <Form {...form}>
        <form
           onSubmit={form.handleSubmit(onSubmit)}
          className='comment-form'
         > 

<FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel  >
                <Image src={currentUserImg} alt="Profile image"
                width={48} height={48} className="rounded-full object-cover"/ >
              </FormLabel>
              <FormControl className="bg-transparent border-none">
                <Input
                    type="text"
                    placeholder="Comment...."
                   className='text-light-1 outline-none no-focus'
                  {...field}
                />
              </FormControl>
             </FormItem>
          )}        />

        <Button type="submit" className="comment-form_btn">
            Replay
        </Button>
        </form>
        </Form>
    )
}

export default Comment ;