import { RiHome6Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { MdPersonOutline } from "react-icons/md";

export const sidebarLinks = [
    {
      route: "/",
      label: "Home",
      logo : <RiHome6Line />
    },
    {
      route: "/search",
      label: "Search",
      logo : <IoSearch />
    },
    {
      route: "/activity",
      label: "Activity",
      logo : <FaRegHeart />
    },
    {
      route: "/create-thread",
      label: "Create Thread",
      logo : <MdOutlineAddToPhotos />
    },
    {
      route: "/communities",
      label: "Communities",
      logo : <BsPeople />
    },
    {
      route: "/profile",
      label: "Profile",
      logo : <MdPersonOutline />
    },
  ];
  
  export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/images/reply.svg" },
    { value: "replies", label: "Replies", icon: "/images/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/images/tag.svg" },
  ];
  
  export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/images/reply.svg" },
    { value: "members", label: "Members", icon: "/images/members.svg" },
    { value: "requests", label: "Requests", icon: "/images/request.svg" },
  ];