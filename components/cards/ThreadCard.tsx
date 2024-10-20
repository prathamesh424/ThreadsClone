
import Image from "next/image";
import Link from "next/link";
import { formatDateString } from "@/lib/utils";
import DeleteThread from "../forms/DeleteThread";
import { addLikeToThread } from "@/lib/actions/thread.actions";
import { FaHeart } from "react-icons/fa";

 
interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likes: Number;
}

async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likes
}: Props) {

  const handleLike = async () => {
    try {
      const response  = await addLikeToThread(id);  
 
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  function formatLikes(likes: Number): string {
    const likeValue = likes.valueOf(); 
  
    if (likeValue >= 1_000_000_000) {
      return (likeValue / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';   
    } else if (likeValue >= 1_000_000) {
      return (likeValue / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';   
    } else if (likeValue >= 1_000) {
      return (likeValue / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';     
    } else {
      return likeValue.toString();                             
    }
  }


  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : "bg-color2  p-7"
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                src={author.image}
                alt='user_community_image'
                fill
                className='cursor-pointer rounded-full'
              />
            </Link>

            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-purple-400'>
                {author.name}
              </h4>
            </Link>

            <p className='mt-2 text-small-regular text-primary_text font-bold'>{content}</p>

            <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className='flex gap-3.5'>
            
              { likes === 0 ? <Image
                      src='/images/heart-gray.svg'
                      alt='like'
                      width={24}
                      height={24}
                      className='cursor-pointer object-contain'
 
                    /> :
                    <div className="flex flex-row-reverse">
                      <FaHeart
                        className='cursor-pointer object-contain text-red-500 ml-1 mt-1 font-bold '
                        />
                        <p className="text-primary_text">{formatLikes(likes)}</p>

                    </div>
              }

                <Link href={`/thread/${id}`}>
                  <Image
                    src='/images/reply.svg'
                    alt='commit'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>
                <Image
                  src='/images/repost.svg'
                  alt='forward'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
                <Image
                  src='/images/share.svg'
                  alt='share'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>

        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className='ml-1 mt-3 flex items-center gap-2'>
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className='mt-1 text-subtle-medium text-gray-1'>
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
    </article>
  );
}

export default ThreadCard;