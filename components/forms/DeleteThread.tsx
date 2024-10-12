"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { deleteThread } from "@/lib/actions/thread.actions";
import toast from "react-hot-toast";  

interface Props {
  threadId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

function DeleteThread({
  threadId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  if (currentUserId !== authorId || pathname === "/") return null;

  const handleDelete = async () => {
    try {
       await deleteThread(JSON.parse(threadId), pathname);

       toast.remove("Thread deleted successfully!");

       if (!parentId || !isComment) {
        router.push("/");
      }
    } catch (error) {
       toast.error("Failed to delete the thread. Please try again.");
    }
  };

  return (
    <Image
      src='/images/delete.svg'
      alt='delete'
      width={18}
      height={18}
      className='cursor-pointer object-contain'
      onClick={handleDelete}  
    />
  );
}

export default DeleteThread;
