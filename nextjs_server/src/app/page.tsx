import { redirect } from "next/navigation";
import Image from "next/image";
export default function Home() {
  redirect("/landing")
  // return (
  //     <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
  //       <h1>Home Web</h1>
  //       <a href={`http://${process.env.APIHOST}`} className="">
  //         Goto Golang Chat
  //       </a>
  //       <a href="/dashboard" className="">
  //         Goto Main Web
  //       </a>
  //     </div>
  // );
}
