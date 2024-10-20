"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";  
import { correctGrammar } from "@/lib/actions/thread.actions"; // Import the correctGrammar function
export const dynamic = 'force-dynamic';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
  userId: string;
}

function PostThread({ userId }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    try {
      await createThread({
        text: values.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });

      toast.success("Thread posted successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to post the thread. Please try again.");
    }
  };

  const handleGrammarCorrection = async () => {
    try {
      const currentText = form.getValues("thread");
      console.log(currentText);
      // Get the current text from the form
      const correctedText = await correctGrammar(currentText); // Call the grammar correction function
      console.log(correctedText);
      form.setValue("thread", correctedText); // Update the textarea with corrected text
      toast.success("Grammar corrected successfully!");
    } catch (error) {
      toast.error("Failed to correct grammar. Please try again.");
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-primary_text">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-color4 bg-color3 text-primary_text">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
