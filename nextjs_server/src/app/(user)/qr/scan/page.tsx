"use client";
import { QrReader } from "react-qr-reader";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function QRPage() {
	const [data, setData] = useState("No result");
    const router =useRouter()
	useEffect(() => {
		try {
			let url = new URL(data);
            console.log("is a valid url")
            if(url.protocol){
                console.log(url.toString())
                router.push(url.toString())
            }
			
		} catch (e) {
            console.log("is not a valid url")
        }
	}, [data]);
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<QrReader
                constraints={{}}
				onResult={(result, error) => {
					if (!!result) {
						setData(result?.getText());
					}

					if (!!error) {
						console.info(error);
					}
				}}
				containerStyle={{ width: "50%", overflow: "hidden" }}
			/>
			<p>{data}</p>
		</div>
	);
}
