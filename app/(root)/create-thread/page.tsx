import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";  

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  try {
    const user = await currentUser();
    if (!user) return null; 
    
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");
    return (
      <>   
        <h1 className='head-text'>Create Thread</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <PostThread userId={userInfo._id} />
        </Suspense>
      </>
    );
  } catch (error) {
   
    console.error("Failed to load user information:", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
}

export default Page;
