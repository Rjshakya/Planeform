import { ThemeToggle } from "@/components/tiptap-main/simple/theme-toggle";
import { Hero } from "./_components/Hero";
import { Nav } from "./_components/Nav";
import bg from "@/public/grad-1.jpg";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import Link from "next/link";
import LandingV2 from "./page-v2";

export default function Landing() {
  return (
    <>
     <LandingV2/>
    </>
  );
}


// {/* <main className="grid grid-cols-1 px-3 md:px-1 relative bg-background z-10 mb-[500px]  sm:mb-[400px] pb-28  border-b-2 dark:border-b-0 ">
// <div className=" col-span-full relative grid grid-cols-1 z-10 h-full">
 
//   <div className="w-full  px-2 fixed top-0 z-50 inset-x-0 overflow-hidden ">
//     <Nav />
//   </div>

//   <Hero />
// </div>


// <section id="features" className="w-full h-full  px-2 md:px-6 mt-48 ">
//   <div className="max-w-3xl mx-auto">
//     <div className="text-left mb-10 md:mb-14 px-1">
//       <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">
//         Features
//       </h2>
//       <p className="text-muted-foreground mt-2 max-w-4xl mx-auto font-medium">
//         Everything you need to build, share, and analyze high‑converting
//         forms.
//       </p>
//     </div>

//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 ">
//       <div className=" border text-card-foreground p-6 grid gap-4">
//         <Button
//           variant={"outline"}
//           size={"icon"}
//           className="my-1 size-12"
//         >
//           <span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className=" fill-foreground size-5"
//               viewBox="0 0 24 24"
//               fill="#fff"
//             >
//               <g clipPath="url(#clip0_4418_7917)">
//                 <path
//                   d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM17.67 9.22C17.48 9.59 17.04 9.74 16.66 9.56C15.43 8.94 14.1 8.6 12.75 8.5V16.29C12.75 16.7 12.41 17.04 12 17.04C11.59 17.04 11.25 16.7 11.25 16.29V8.5C9.9 8.6 8.57 8.94 7.34 9.56C7.23 9.61 7.11 9.63 7 9.63C6.73 9.63 6.46 9.48 6.33 9.22C6.14 8.85 6.29 8.4 6.66 8.21C10 6.54 13.99 6.54 17.33 8.21C17.71 8.4 17.86 8.85 17.67 9.22Z"
//                   fill="white"
//                   style={{ fill: "var(--fillg)" }}
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_4418_7917">
//                   <rect width="24" height="24" fill="white" />
//                 </clipPath>
//               </defs>
//             </svg>
//           </span>
//         </Button>
//         <div className="pl-1">
//           <div className="text-lg font-medium">Block based Editor</div>
//           <p className="text-sm text-muted-foreground ">
//             Compose forms quickly with an intuitive, flexible editor.
//           </p>
//         </div>
//       </div>

//       <div className=" border text-card-foreground p-6 grid gap-4">
//         <Button
//           variant={"outline"}
//           size={"icon"}
//           className="my-1 size-12"
//         >
//           <span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className=" size-5 fill-foreground"
//               viewBox="0 0 24 24"
//               fill="#fff"
//             >
//               <g clipPath="url(#clip0_4418_8844)">
//                 <path
//                   d="M21 22.75H3C2.59 22.75 2.25 22.41 2.25 22C2.25 21.59 2.59 21.25 3 21.25H21C21.41 21.25 21.75 21.59 21.75 22C21.75 22.41 21.41 22.75 21 22.75Z"
//                   fill="white"
//                   style={{ fill: "var(--fillg)" }}
//                 />
//                 <path
//                   d="M5.6 8.38086H4C3.45 8.38086 3 8.83086 3 9.38086V18.0009C3 18.5509 3.45 19.0009 4 19.0009H5.6C6.15 19.0009 6.6 18.5509 6.6 18.0009V9.38086C6.6 8.82086 6.15 8.38086 5.6 8.38086Z"
//                   fill="white"
//                   style={{ fill: "var(--fillg)" }}
//                 />
//                 <path
//                   d="M12.8 5.18945H11.2C10.65 5.18945 10.2 5.63945 10.2 6.18945V17.9995C10.2 18.5495 10.65 18.9995 11.2 18.9995H12.8C13.35 18.9995 13.8 18.5495 13.8 17.9995V6.18945C13.8 5.63945 13.35 5.18945 12.8 5.18945Z"
//                   fill="white"
//                   style={{ fill: "var(--fillg)" }}
//                 />
//                 <path
//                   d="M19.9999 2H18.3999C17.8499 2 17.3999 2.45 17.3999 3V18C17.3999 18.55 17.8499 19 18.3999 19H19.9999C20.5499 19 20.9999 18.55 20.9999 18V3C20.9999 2.45 20.5499 2 19.9999 2Z"
//                   fill="white"
//                   style={{ fill: "var(--fillg)" }}
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_4418_8844">
//                   <rect width="24" height="24" fill="white" />
//                 </clipPath>
//               </defs>
//             </svg>
//           </span>
//         </Button>
//         <div className="pl-1">
//           <div className="text-lg font-medium">Analytics</div>
//           <p className="text-sm text-muted-foreground">
//             Track views, completions, and drop‑offs to optimize
//             conversions.
//           </p>
//         </div>
//       </div>

//       <div className=" border text-card-foreground p-6 grid gap-4">
//         <Button
//           variant={"outline"}
//           size={"icon"}
//           className="my-1 size-12"
//         >
//           <span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="size-5 fill-foreground"
//               viewBox="0 0 24 24"
//               fill="#fff"
//             >
//               <g clipPath="url(#clip0_4418_7916)">
//                 <path
//                   d="M19.07 14.2396C18.78 14.5296 18.32 14.5296 18.04 14.2396C17.75 13.9496 17.75 13.4896 18.04 13.2096C20.04 11.2096 20.04 7.95961 18.04 5.96961C16.04 3.97961 12.79 3.96961 10.8 5.96961C8.81003 7.96961 8.80003 11.2196 10.8 13.2096C11.09 13.4996 11.09 13.9596 10.8 14.2396C10.51 14.5296 10.05 14.5296 9.77003 14.2396C7.20003 11.6696 7.20003 7.48961 9.77003 4.92961C12.34 2.36961 16.52 2.35961 19.08 4.92961C21.64 7.49961 21.64 11.6696 19.07 14.2396Z"
//                   fill="white"
//                   style={{ fill: "var(--fillg)" }}
//                 />
//                 <path
//                   d="M4.92997 9.76047C5.21997 9.47047 5.67997 9.47047 5.95997 9.76047C6.24997 10.0505 6.24997 10.5105 5.95997 10.7905C3.95997 12.7905 3.95997 16.0405 5.95997 18.0305C7.95997 20.0205 11.21 20.0305 13.2 18.0305C15.19 16.0305 15.2 12.7805 13.2 10.7905C12.91 10.5005 12.91 10.0405 13.2 9.76047C13.49 9.47047 13.95 9.47047 14.23 9.76047C16.8 12.3305 16.8 16.5105 14.23 19.0705C11.66 21.6305 7.47997 21.6405 4.91997 19.0705C2.35997 16.5005 2.35997 12.3305 4.92997 9.76047Z"
//                   fill="white"
//                   style={{ fill: "var(--fillg)" }}
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_4418_7916">
//                   <rect width="24" height="24" fill="white" />
//                 </clipPath>
//               </defs>
//             </svg>
//           </span>
//         </Button>
//         <div className="pl-1">
//           <div className="text-lg font-medium">Embeds & sharing</div>
//           <p className="text-sm text-muted-foreground">
//             Share links or embed anywhere with responsive, accessible
//             UI.
//           </p>
//         </div>
//       </div>

//       <div className=" border text-card-foreground p-6 grid gap-4">
//         <Button
//           variant={"outline"}
//           size={"icon"}
//           className="my-1 size-12"
//         >
//           <span>
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className=" size-5 fill-foreground"
//               viewBox="0 0 24 24"
//               fill="#fff"
//             >
//               <g clipPath="url(#clip0_4418_8955)">
//                 <path
//                   d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.7 16.14H6.44C6.25 16.14 6.12998 15.93 6.22998 15.76L8.35999 12.21C8.45999 12.05 8.68998 12.05 8.78998 12.21L10.92 15.76C11.02 15.93 10.9 16.14 10.7 16.14ZM9.87 10.14C9.68 10.14 9.55997 9.92999 9.65997 9.75999L11.79 6.21001C11.89 6.05001 12.12 6.05001 12.22 6.21001L14.35 9.75999C14.45 9.92999 14.33 10.14 14.14 10.14H9.87ZM17.56 16.14H13.3C13.11 16.14 12.99 15.93 13.09 15.76L15.22 12.21C15.32 12.05 15.55 12.05 15.65 12.21L17.78 15.76C17.87 15.93 17.75 16.14 17.56 16.14Z"
//                   fill="white"
//                   style={{fill:"var(--fillg)"}}
//                 />
//               </g>
//               <defs>
//                 <clipPath id="clip0_4418_8955">
//                   <rect width="24" height="24" fill="white" />
//                 </clipPath>
//               </defs>
//             </svg>
//           </span>
//         </Button>
//         <div className="pl-1">
//           <div className="text-lg font-medium">Integrations</div>
//           <p className="text-sm text-muted-foreground">
//             Connect with your stack using webhooks and native
//             integrations.
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>



// <div className=" w-16 h-16 fixed bottom-1 right-1 z-30">
//   <ThemeToggle />
// </div>
// </main>

// <footer className="w-full px-2 md:px-6 mt-24 fixed bottom-0 -z-0 bg-foreground text-background ">
// <div className="w-full border-t pt-10 pb-6">
//   <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//     <div className="md:col-span-2 flex flex-col justify-end gap-3">
//       <div className="flex items-center gap-2">
//         <Logo />
//       </div>
//       <p className="text-sm text-muted-foreground max-w-md">
//         Build beautiful, modern forms with an intuitive block-based
//         editor.
//       </p>
//       <p className="text-xs text-muted-foreground">
//         © {new Date().getFullYear()} Planetform. All rights reserved.
//       </p>
//       {/* <div className="flex items-center gap-3 mt-1">
//         <Button asChild size="sm">
//           <Link className="" href="/auth">Get started</Link>
//         </Button>
//         <Button asChild size="sm" variant="outline">
//           <Link className="" href="#comparison">Compare</Link>
//         </Button>
//       </div> */}
//     </div>

//     <div>
//       <div className="text-sm font-semibold mb-3">Product</div>
//       <ul className="space-y-2 text-sm text-muted-foreground">
//         <li>
//           <a href="#features" className="hover:opacity-70">
//             Features
//           </a>
//         </li>
//         <li>
//           <a href="#comparison" className="hover:opacity-70">
//             Comparison
//           </a>
//         </li>
//         <li>
//           <a href="#" className="hover:opacity-70">
//             Templates
//           </a>
//         </li>
//       </ul>
//     </div>

//     <div>
//       <div className="text-sm font-semibold mb-3">Company</div>
//       <ul className="space-y-2 text-sm text-muted-foreground">
//         <li>
//           <a href="#" className="hover:opacity-70">
//             About
//           </a>
//         </li>
//         <li>
//           <a href="#" className="hover:opacity-70">
//             Contact
//           </a>
//         </li>
//         <li>
//           <a href="#" className="hover:opacity-70">
//             Roadmap
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>

//   <div className="mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
//     <div className="flex sm:hidden items-center gap-4 pl-1 md:pl-0 mt-2 md:mt-0 text-xs text-muted-foreground">
//       <a href="#" className="hover:text-foreground">
//         Privacy
//       </a>
//       <a href="#" className="hover:text-foreground">
//         Terms
//       </a>
//       <a href="#" className="hover:text-foreground">
//         Status
//       </a>
//     </div>

//     <div className="flex flex-col items-center gap-3 mt-2 md:mt-1">
//       <div className="flex items-center gap-3 mt-1">
//         <Button asChild size="sm">
//           <Link className="" href="/auth">
//             Get started
//           </Link>
//         </Button>
//       </div>
//     </div>

//     <div className="sm:flex items-center gap-4 hidden text-xs text-muted-foreground">
//       <a href="#" className="hover:opacity-70">
//         Privacy
//       </a>
//       <a href="#" className="hover:opacity-70">
//         Terms
//       </a>
//       <a href="#" className="hover:opacity-70">
//         Status
//       </a>
//     </div>
//   </div>
//   <div className="w-full mt-10">
//     <h1 className="text-7xl md:text-9xl font-bold tracking-tighter ">
//       Planetform
//     </h1>
//   </div>
// </div>
// </footer> */}