import { useEffect } from "react";
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function CustomInput({
	label,
	disabled,
	initValue,
	name,
	field_options,
	onSubmit,
}: {
	label: string;
	disabled?: boolean;
	initValue?: string;
	name: string;
	field_options?: RegisterOptions<FieldValues, string> | undefined;
	onSubmit?: (params:any)=>Promise<any>;
}) {
	const { register, handleSubmit, formState, setValue, getValues } = useForm();
	const field = register(name, field_options);
	useEffect(() => {
		setValue(name, initValue);
	}, []);
	return (
		<div style={{ margin: "0 0 1rem 0",width:"80%" }}>
				<label
					htmlFor=""
					style={{
						display: "block",
						width: "auto",
						marginBottom: "0.5rem",
					}}
				>
					{label}
				</label>
				<div style={{display:"flex",flexDirection:"row"}}>
				{!disabled && (
					<input
						type="text"
						style={{
							height: "2.3rem",
							border: "1px solid #D4D4D4",
							borderRadius: "6px",
							color: "#171717",
							fontSize: "1rem",
							lineHeight: 1.4,
							padding: "0.3rem 0.5rem",
							display: "block",
							width: "50%",
						}}
						{...field}
						onBlur={handleSubmit((params:any)=>{
                            console.log("onblur")
							if(getValues(name)!=initValue&&onSubmit){
								let info_toast=toast.info(`Đang thay đổi giá trị ${label}`)
								onSubmit(params).then(()=>{
									try{
										toast.dismiss()
									} catch(e){
									}
                                    initValue=params[field.name]
									toast.success(`Thay đổi giá trị ${label} thành công`)
								}).catch((e)=>{
									toast.error(`Thay đổi giá trị ${label} không thành công`)
								})
								
							}
						})}
					/>
				)}
			{/* <div style={{marginLeft:"2rem"}}>Thay đổi thành công</div> */}
				</div>
				{disabled && (
					<p style={{ lineHeight: 1.4, padding: "0.3rem 0",opacity:"90%" }}>
						{getValues(name)}
					</p>
				)}
			</div>
	);
}