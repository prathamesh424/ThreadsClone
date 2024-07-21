import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
 import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";
 


const Page =async () => {
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const activity = await getActivity(userInfo._id);

    return (
      <section>
          <h1 className="head-text mb-10">Activity</h1>
          <section className="mt-10 flex flex-col gap-5">
              {
                activity.length > 0 ? (
                  <>{
                    activity.map((activity) => (
                      <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                          <article className="activity-card">
                              <Image
                              src={activity.author.image}/>
                          </article>
                      </Link>
                    ))}</>
                
                ) : <p>No Activity yet</p>}
          </section>
      </section>
    )
  }
  
  export default Page