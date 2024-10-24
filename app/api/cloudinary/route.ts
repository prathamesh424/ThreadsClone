/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextRequest , NextResponse } from "next/server";
import {v2 as cloudinary} from "cloudinary" ;


cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
})

interface CloudinaryUploadResult  {
    public_id: string;
    [key: string]: string; 
}


export async function POST(request : NextRequest) {
    try {
        const formData = await request.formData() ;
        const file = formData.get("image") as File | null;

        if (!file) {
            return NextResponse.json(
                {error: "No file provided"} ,
                {status: 400}
            )
        }
        const bytesFile = await file.arrayBuffer() ;
        const bufferFile = Buffer.from(bytesFile) ;
        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload_stream({folder: "Let`s Tweet"},
                (error, result) => {
                if (error) {
                    reject(error) ;
                } else {
                    resolve(result as CloudinaryUploadResult) ;
                }
            }).end(bufferFile) ;

        }
        )
        
        console.log("api cloifdhkjf", result)

    return NextResponse.json(
        {publicId: result.secure_url} , {status: 200}
    )
    } catch (error) {
        console.log(error) ;
        return NextResponse.json(
            {error : "Uploading File failed"} ,
            {status: 500}
        )
    }
}