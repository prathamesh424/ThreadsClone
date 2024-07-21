"use server" 
import { revalidatePath } from 'next/cache';
import  {User}  from '../models/user.model';
import  connectDB  from '../mongoose'
import { Thread } from '../models/thread.model';
import { FilterQuery, SortOrder } from 'mongoose';

interface Params {
    userId:string,
    username: string ,
    name: string ,
    bio: string ,
    image: string ,
    path: string 
}

export async function updateUser(
    {userId ,
    username   ,
    name   ,
    bio  ,
    image   ,
    path}: Params ): Promise<void> {connectDB();

    try {
        await User.findOneAndUpdate({id:userId} ,
            {   
                username: username.toLowerCase() ,
                name , 
                bio ,
                image ,
                onboarded : true ,
            },
            {
                upsert: true
            }
        ) ;
    
        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    } catch (error: any) {
        throw new  Error(`Failed to create/update user :`)
    }
}


export async function fetchUser(userId: string) {
    try {
        connectDB();
        return await User
            .findOne({id: userId})
            // .populate({
            //     path: 'communities',
            //     model: Community
            // })
    } catch (error : any) {
        throw new Error(`Failed to fetch user : ${error.message}`);
    }
}


export async function fetchUserPosts(userId: string) {

    try {
        connectDB(); 
        // Community 
        const threads = await User.findOne({id : userId})
                    .populate({
                        path: 'threads',
                        model: Thread,
                        populate :{
                            path: 'children',
                            model: Thread,
                            populate: { 
                                path: 'author',
                                model : User ,
                                select: 'name  image id'
                            }
                        }
                    })
        return threads ;

    } catch (error : any) {
        throw new Error(`Failed to fetch user posts : ${error.message}`);
    }
}


export async function fetchUsers({
    userId ,
    searchString = "" ,
    pageNumber = 1 ,
    pageSize = 20 , 
    sortBy = "desc"
} : {
    userId : string ;
    searchString?: string ;
    pageNumber?:number ;
    pageSize?:number ;
    sortBy?: SortOrder
}) {
    try {
        connectDB();
        const skipAmount = (pageNumber - 1) *  pageSize ;
        const regex = new RegExp(searchString , "i") ;

        const query : FilterQuery <typeof User> = { id : { $ne:userId}}

        if(searchString.trim() !== '') {
            query.$or = [{username: {$regex: regex}} ,
                        {name: {$regex: regex}}]
        }

        const sortOpsitions = {createdAt: sortBy} ;

        const usersQuery = User.find(query)
                .sort(sortOpsitions)
                .skip(skipAmount)
                .limit(pageSize) ;

        const totalUser = await User.countDocuments(query) ;

        const users = await usersQuery.exec() ;
        const isNext = totalUser > skipAmount + users.length;
        
        return {users , isNext}; 

    } catch (error:any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

export async function getActivity (userId : string) {
    try {   
        connectDB() ;
        const userThreads = await Thread.find({author: userId});

        const childThreadIds = userThreads.reduce((acc, userThread) =>{
            return acc.concat(userThread.children);
        } , []) ;

        const replies = await Thread.find({
            _id : {$in: childThreadIds},
            author: {$ne: userId}})
            .populate({
                path:'author',
                model: User,
                select: 'name image _id'
            })

        return replies;
    } catch (error:any) {
        throw new Error(`Failed to fetch activity: ${error.message}`);
    }
}

