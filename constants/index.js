import { RiHome6Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { MdPersonOutline } from "react-icons/md";

export const sidebarLinks = [
    {
      imgURL: "/images/home.svg",
      route: "/",
      label: "Home",
      logo : <RiHome6Line />
    },
    {
      imgURL: "/images/search.svg",
      route: "/search",
      label: "Search",
      logo : <IoSearch />
    },
    {
      imgURL: "/images/heart.svg",
      route: "/activity",
      label: "Activity",
      logo : <FaRegHeart />
    },
    {
      imgURL: "/images/create.svg",
      route: "/create-thread",
      label: "Create Thread",
      logo : <MdOutlineAddToPhotos />
    },
    {
      imgURL: "/images/community.svg",
      route: "/communities",
      label: "Communities",
      logo : <BsPeople />
    },
    {
      imgURL: "/images/user.svg",
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