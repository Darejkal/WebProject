import Image from "next/image";
export default function Home() {
  return (
      <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
        <a href={`http://${process.env.APIHOST}`} className="">
          Goto Golang Chat
        </a>
        <a href="/home" className="">
          Goto Main Web
        </a>
      </div>
  );
}
