"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";  
import { correctGrammar } from "@/lib/actions/thread.actions"; // Import the correctGrammar function
import { createThread } from "@/lib/actions/thread.actions"; // Import your createThread action
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Use Input for title and file upload
import { ThreadValidation } from "@/lib/validations/thread";
import { useState } from "react"; // State for file upload

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  
  const [image, setImage] = useState<File | null>(null); // State to hold the uploaded image file

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
      title: "", // Title added to form
    },
  });

 const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
  try {
    let image_url = null;

    // If an image is selected, upload it to Cloudinary
    if (image) {
      const formData = new FormData();
      formData.append('image', image); // Pass the image file to formData

      const response = await fetch('/api/cloudinary', {
        method: 'POST',
        body: formData, // Send formData with the image
      });

      const data = await response.json();
      image_url = data.publicId; // Store the Cloudinary publicId as image_url
    }

    // Prepare data to send to backend
    const threadData = {
      text: values.thread,
      title: values.title || null,  // Title is optional
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
      image_url: image_url, // Pass the uploaded image URL or null if no image was uploaded
    };

    // Call the backend to create the thread
    await createThread(threadData);

    // Success notification and redirect
    toast.success("Thread posted successfully!");
    router.push("/");
  } catch (error) {
    toast.error("Failed to post the thread. Please try again.");
  }
};


  // Grammar correction logic
  const handleGrammarCorrection = async () => {
    try {
      const currentText = form.getValues("thread");
      const correctedText = await correctGrammar(currentText);
      form.setValue("thread", correctedText); // Update the textarea with corrected text
      toast.success("Grammar corrected successfully!");
    } catch (error) {
      toast.error("Failed to correct grammar. Please try again.");
    }
  };

  // Handle image file selection
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
