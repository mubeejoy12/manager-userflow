import Image from "next/image";
import CreatePassword from "./signup/page";
import DashboardLayout from "./components/DashboardLayout";
import { redirect } from 'next/navigation';
// import { CreatePassword } from "./signup/page";

export default function Home() {
  redirect('/overview');
  // return (
  //   <div className="">
  //     <DashboardLayout />
  //     <CreatePassword />
  //   </div>
  // );
}
