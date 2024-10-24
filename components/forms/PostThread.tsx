"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";  
import { createThread } from "@/lib/actions/thread.actions";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; 
import { ThreadValidation } from "@/lib/validations/thread";
import { useState } from "react";  

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  
  const [image, setImage] = useState<File | null>(null); 

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
      title: "",
    },
  });

 const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
  try {
    let image_url = null;

    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      console.log("image upload data :...." ,data);
      image_url = data.publicId;
    }

    const threadData = {
      text: values.thread,
      title: values.title || null,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
      image_url: image_url, 
    };
    await createThread(threadData);

    toast.success("Thread posted successfully!");
    router.push("/");
  } catch (error) {
    toast.error("Failed to post the thread. Please try again.");
  }
};


const handleGrammarCorrection = async () => {
  try {
    const currentText = form.getValues("thread");
    const language = "en-US"; 

    const requestBody = {
      thread: currentText,
      language: language, 
    };

    const response = await fetch('/api/correct-grammar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to correct grammar');
    }

    const { correctedText } = await response.json();
    form.setValue("thread", correctedText);
    toast.success("Grammar corrected successfully!");
  } catch (error) {
    toast.error("Failed to correct grammar. Please try again.");
  }
};

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Title Input */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-primary_text">Title</FormLabel>
              <FormControl className="no-focus border border-color4 bg-color3 text-primary_text">
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thread Content Input */}
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-primary_text">Content</FormLabel>
              <FormControl className="no-focus border border-color4 bg-color3 text-primary_text">
                <Textarea placeholder="Enter the detailed description....." rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload Input */}
        <FormItem className="flex w-full flex-col gap-3">
          <FormLabel className="text-base-semibold text-primary_text">Upload Image</FormLabel>
          <FormControl className="no-focus border border-color4 bg-color3 text-primary_text">
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>
        </FormItem>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button type="button" onClick={handleGrammarCorrection} className="bg-secondary-500">
            Correct Grammar
          </Button>
          <Button type="submit" className="bg-primary-500">
            Post Thread
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostThread;
