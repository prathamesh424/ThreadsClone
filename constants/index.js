export const sidebarLinks = [
    {
      imgURL: "/images/home.svg",
      route: "/",
      label: "Home",
    },
    {
      imgURL: "/images/search.svg",
      route: "/search",
      label: "Search",
    },
    {
      imgURL: "/images/heart.svg",
      route: "/activity",
      label: "Activity",
    },
    {
      imgURL: "/images/create.svg",
      route: "/create-thread",
      label: "Create Thread",
    },
    {
      imgURL: "/images/community.svg",
      route: "/communities",
      label: "Communities",
    },
    {
      imgURL: "/images/user.svg",
      route: "/profile",
      label: "Profile",
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