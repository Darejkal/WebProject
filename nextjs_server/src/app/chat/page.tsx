import { redirect } from "next/navigation";

export default function ChatPage() {
    redirect(`http://${process.env.APIHOST}`)
}
