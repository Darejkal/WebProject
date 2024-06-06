"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import SearchableInput from "@/app/_components/SearchableInput";
import { useFetch } from "@/app/_helpers/client/useFetch";
import { useForm } from "react-hook-form";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
export default function QRPage() {
	const [showQRModal, setShowQRModal] = useState<boolean>(false);
	const fetch = useFetch();
	const { register, handleSubmit, setValue, getValues, setError } = useForm();
	const [qrSVGString, setQRSVGString] = useState("");
	const [urlText, setUrlText] = useState("");
	const generateQRCode = useCallback(() => {
		if (urlText) {
            QRCode.toString(urlText, {
                type:"svg"
            }, function (err, svg) {
                if (err) {
                    toast.warning("Lỗi khi tạo QR code",{delay:200})
                }
                
                var container = document.getElementById('qr-container')
                if(container){
                    container.innerHTML=svg
                    setQRSVGString(svg)
                }
            })
		}
	}, [urlText]);
	useEffect(() => {
		generateQRCode();
	}, [urlText]);
	const fields = {
		name: register("name", { required: "name is required" }),
		subjectinstanceid: register("subjectinstanceid", {
			required: "subjectinstanceid is required",
		}),
	};
	const onSubmit = (props: any) => {
		if (!props.subjectinstanceid) {
			setError(fields.name.name, {
				message: "có lỗi khi nhập liệu, vui lòng thao tác lại",
			});
		}
		toast.info("Đang tạo mã QR...");
		fetch
			.post("/api/attendance/create", {
				subjectinstanceid: props.subjectinstanceid,
			})
			.then((v: { uuid: string }) => {
				setUrlText(window.location.protocol+'//'+window.location.host+"/qr/check/"+v.uuid);
				toast.dismiss();
			})
			.catch((e) => {
				toast.dismiss();
				toast.warning("Tạo mã QR không thành công. Vui lòng thử lại.", {
					delay: 200,
				});
			});
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				padding: "2rem 10rem",
				width: "auto",
				boxSizing: "border-box",
				height: "100%",
			}}
		>
            <Modal show={showQRModal} onHide={() => setShowQRModal(false)} style={{width:"100vw",height:"100vh"}}>
                <Modal.Header closeButton>
					{/* <Modal.Title>Thêm môn học</Modal.Title> */}
				</Modal.Header>
                <Modal.Body style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <div id="qr-container" style={{height:"100%",width:"100%"}} dangerouslySetInnerHTML={{__html:qrSVGString}}></div>
                </Modal.Body>
            </Modal>
			<div
				style={{
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Form onSubmit={handleSubmit(onSubmit)} style={{ width: "70%" }}>
					<Form.Group controlId="name">
						<Form.Label>Tên</Form.Label>
						<SearchableInput
							autocompleteProps={{ 
                                freeSolo: false, 
                                renderOption:(props,option,state,ownerState)=>(
                                    <Box
                                        component="li"
                                        {...props}
                                        key={(typeof option ==="string")?option:option.uuid}
                                    >
                                        {(typeof option==="string")?option:(`${option["name"]} | ${option["subjectabbrev"]}`)}
                                    </Box>
                                    )
                            }}
							fetchData={(input: string) => {
								let queryParam = new URLSearchParams();
								queryParam.set("query", input);
								console.log(`search?${queryParam.toString()}`);
								return fetch
									.get(`/api/subjectinstance/search?${queryParam.toString()}`)
									.then((v) => {
										if (!v || !Array.isArray(v)) {
											throw "invalid value";
										}
										return v;
									})
									.catch((e) => {
										return [];
									}) as Promise<
									{
										name: string;
										subjectabbrev: string;
										uuid: string;
									}[]
								>;
							}}
							props={{
								optionLabel: "name",
							}}
							formRegister={fields.name}
							textFieldProps={{ label: "Nhập tên lớp học muốn điểm danh" }}
							afterOnChange={({ value }) => {
								if (!value) {
									setValue(fields.subjectinstanceid.name, undefined);
								} else if (typeof value === "string") {
									setValue(fields.subjectinstanceid.name, value);
								} else {
									setValue(fields.subjectinstanceid.name, value.uuid);
								}
							}}
						/>
					</Form.Group>
					<Button
						variant="primary"
						type="submit"
						style={{ margin: "1rem auto 0", display: "block" }}
					>
						Submit
					</Button>
				</Form>
			</div>
			<div
				style={{
					flex: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
                    flexDirection:"column",
				}}
			>
				<h4>QR điểm danh</h4>
                <div id="qr-container" style={{height:"20rem",width:"20rem"}} onClick={()=>{
                    setShowQRModal(true)
                }}></div>
				{/* <img src={qrCodeUri} style={{width:"70%"}} aria-label="Generated QR Code" /> */}
			</div>
		</div>
	);
}
const QrCreate = () => {
	const [text, setText] = useState("");
	const [qrCodeUrl, setQrCodeUrl] = useState("");

	const generateQRCode = async () => {
		try {
			const url = await QRCode.toDataURL(text);
			setQrCodeUrl(url);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
			}}
		>
			<h1>QR Code Generator</h1>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Enter text"
				style={{ padding: "10px", marginBottom: "20px", width: "300px" }}
			/>
			<button
				onClick={generateQRCode}
				style={{ padding: "10px 20px", marginBottom: "20px" }}
			>
				Generate QR Code
			</button>
			{qrCodeUrl && (
				<div>
					<img src={qrCodeUrl} alt="Generated QR Code" />
				</div>
			)}
		</div>
	);
};
