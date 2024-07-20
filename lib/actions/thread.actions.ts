"use server"

import { revalidatePath } from "next/cache";
import { Thread } from "../models/thread.model";
import { User } from "../models/user.model";
import connectDB from "../mongoose";
import { model } from "mongoose";
import { threadId } from "worker_threads";


interface Params {
    text: string , 
    author: string ,
    communityId : string | null ,
    path : string
}

export async function createThread ({text , author ,communityId, path} : Params) {
    try {
        connectDB(); 
        const createdThread = await Thread.create({
            text,
            author,
            community : null,
        });

        await User.findByIdAndUpdate(author , {
            $push: { threads: createdThread._id },
        })

        revalidatePath(path);
    } catch (error: any) {
        // throw new Error(`Error in creating thread  ${error.message}`);
    } 
}

export async function fetchPosts(pageNo = 1 , pageSize= 20) {
      connectDB() ; 
      const skipAmount = (pageNo -1) * pageSize ;

      const postsQuery = Thread.find({parentId: {$in: [null , undefined]}})
      .sort({createdAt: 'desc'})
      .skip(skipAmount) 
      .limit(pageSize) 
      .populate({path: 'author' , model : User})
      .populate({path: 'children' ,
        populate :{
            path: 'author' ,
            model : User ,
            select: "_id name parent_id image"
        }
      })

      const totalPosts = await Thread.countDocuments({parentId: {$in: [null , undefined]}} );

      const posts =  await postsQuery.exec();
      const  isNext = totalPosts >skipAmount + posts.length ;
      
      return { posts ,isNext}
}



export async function fetchThread (id : string) {
        connectDB();
        try {
            const thread = await Thread.findById(id) 
                .populate({
                    path : 'author' ,
                    model: User ,
                    select : "_id id name image"
                })
                .populate( {
                    path: 'children' ,
                    populate :[
                        { path : 'author' ,
                        model: User ,
                        select : "_id id name parentId image" } ,
                        {
                            path : 'children' ,
                            model: Thread ,
                            populate :{ 
                                path: 'author', 
                                model : User ,
                                select :  "_id id name parentId image" 
                            }
                         }]}).exec() ;
                         return thread; 
        } catch (error : any) {
            throw new Error (`Error in getting comments ... ${error.message}`)
        }
}



export async function addCommentToThread(
    thread : string ,
    commentText :  string , 
    userId : string ,
    path: string
) {
    
    connectDB() ;
    try {
        const originalThread = await Thread.findById(threadId);
        if(!originalThread) throw new Error("thread not found");

        const commentThred = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId,
        });
        const savedCommentThread = await commentThred.save() ;
        originalThread.children.push(savedCommentThread._id);

        await originalThread.save();
        revalidatePath(path);
    } catch (error :any) {
        throw new Error(`Error in adding comment to thread... ${error.message}`)
    }
}