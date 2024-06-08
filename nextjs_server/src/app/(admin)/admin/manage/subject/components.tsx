'use client'
import { DeleteOutline, EditNote } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useFetch } from '@/app/_helpers/client';
import { toast } from "react-toastify";
import { IServiceSubject } from "@/app/_services/useSubjectService";

export function UpdateSubjectModal({ show, subject, afterSubmit }: { show?: boolean, subject: IServiceSubject, afterSubmit?: () => any }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const fields = {
    name: register("name", { required: "Tên môn học là bắt buộc" }),
    abbrev: register("abbrev", { required: "Tên viết tắt là bắt buộc" }),
    uuid: register("uuid", { required: "Mã id môn học là bắt buộc" }),
    schoolabbrev: register("schoolabbrev", { required: "Tên viết tắt trường là bắt buộc" ,value: "HUST",}),
    imgurl: register("imgurl"),
    description: register("description")
  };

  useEffect(() => {
    if (subject) {
      setValue("name", subject.name);
      setValue("abbrev", subject.abbrev);
      setValue("uuid", subject.uuid);
      setValue("imgurl", subject.imgurl);
      setValue("description", subject.description);
    }
  }, [subject, setValue]);

  const fetch = useFetch();
  const onSubmit = (data: any) => {
    toast.info("Đang cập nhật thông tin môn học!");
    fetch.post("/api/subject/update", data)
      .then(() => {
        toast.dismiss();
        toast.success("Cập nhật thông tin môn học thành công!");
        setShowModal(false);
        afterSubmit && afterSubmit();
      })
      .catch(() => {
        toast.dismiss();
        toast.warning("Cập nhật thông tin môn học thất bại!");
      });
  };

  return (
    <>
      <IconButton onClick={() => setShowModal(true)}>
        <EditNote sx={{ color: "grey" }} />
      </IconButton>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa thông tin môn học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>Chỉnh sửa thông tin môn học bằng cách thay đổi các thông tin sau:</Form.Label>
            <TextField
              sx={{ marginTop: "0.5rem" }}
              fullWidth
              autoComplete="off"
              inputRef={fields.name.ref}
              {...fields.name}
              label="Tên môn học"
              error={!!errors.name}
              helperText={(errors.name?.message as string) ?? ""}
            />
            <TextField
              sx={{ marginTop: "0.5rem" }}
              fullWidth
              autoComplete="off"
              inputRef={fields.abbrev.ref}
              {...fields.abbrev}
              label="Mã môn"
              error={!!errors.abbrev}
              helperText={(errors.abbrev?.message as string) ?? ""}
            />
						<Form.Group controlId="schoolabbrev">
							<Form.Label>Mã trường</Form.Label>
							<Form.Control type="text" {...fields.schoolabbrev} disabled />
						</Form.Group>
            <TextField
              sx={{ marginTop: "1rem" }}
              fullWidth
              autoComplete="off"
              inputRef={fields.imgurl.ref}
              {...fields.imgurl}
              label="URL hình ảnh"
              error={!!errors.imgurl}
              helperText={(errors.imgurl?.message as string) ?? ""}
            />
            <TextField
              sx={{ marginTop: "0.5rem" }}
              fullWidth
              autoComplete="off"
              inputRef={fields.description.ref}
              {...fields.description}
              label="Mô tả"
              error={!!errors.description}
              helperText={(errors.description?.message as string) ?? ""}
            />
            <TextField
              sx={{ marginTop: "0.5rem" }}
              fullWidth
              autoComplete="off"
              inputRef={fields.uuid.ref}
              {...fields.uuid}
              label="ID môn học"
              error={!!errors.uuid}
              helperText={(errors.uuid?.message as string) ?? ""}
              disabled
            />
            <Button variant="primary" type="submit" style={{ margin: "1rem auto 0", display: "block" }}>Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export function DeleteSubjectModal({ show, subject, afterSubmit }: { show?: boolean, subject: IServiceSubject, afterSubmit?: () => any }) {
  const [showModal, setShowModal] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
	} = useForm();
  useEffect(() => {
    setShowModal(show ? show : false);
  }, [show]);

	const fetch=useFetch()
    const onSubmit=()=>{
		toast.info("Đang truy vấn")
		fetch.post("/api/subject/delete",{uuid:subject.uuid}).then(()=>{
			toast.success("Xóa môn học thành công!")
			setShowModal(false)
			afterSubmit && afterSubmit();
		}).catch((e)=>{
			toast.warning("Xóa môn học thất bại!")
		})
    }
  return (
    <>
      <IconButton onClick={() => setShowModal(true)}>
        <DeleteOutline sx={{ color: "grey" }} />
      </IconButton>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa môn học</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Label>
              <span className="text-danger">Cảnh báo hành động nguy hiểm:</span><br />
              Hãy xác nhận hành động xóa môn học{" "}
              <span style={{ fontWeight: "bold", fontStyle: "italic" }}>{subject.name}</span>
            </Form.Label>
            <Button variant="primary" type="submit" style={{ margin: "1rem auto 0", display: "block" }}>Xác nhận</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

// export function AddSubjectModal({ show, afterSubmit }: { show?: boolean, afterSubmit?: () => any }) {
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const { register, handleSubmit, formState: { errors }, setError, clearErrors, getValues } = useForm();
//   const abbrevExisted = useRef<boolean>(false);

//   const fields = {
//     name: register("name", { required: "Tên môn học là bắt buộc" }),
//     abbrev: register("abbrev", { required: "Tên viết tắt là bắt buộc" }),
//     schoolabbrev: register("schoolabbrev", { required: "Tên viết tắt trường là bắt buộc" }),
//     imgurl: register("imgurl"),
//     description: register("description")
//   };

//   const fetch = useFetch();
//   const onSubmit = (data: any) => {
//     if (abbrevExisted.current) {
//       setError(fields.abbrev.name, {
//         message: "Tên viết tắt đã tồn tại!",
//         type: "submit"
//       });
//       return;
//     }
//     toast.info("Đang tạo môn học!");
//     fetch.post("/api/subject/create", data)
//       .then(() => {
//         toast.dismiss();
//         toast.success("Thêm môn học thành công!");
//         setShowModal(false);
//         afterSubmit && afterSubmit();
//       })
//       .catch(() => {
//         toast.dismiss();
//         toast.warning("Thêm môn học thất bại!");
//       });
//   };

//   return (
//     <>
//       <Button variant="outline-primary" onClick={() => setShowModal(true)}>Thêm môn học</Button>
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Thêm môn học</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit(onSubmit)}>
//             <Form.Label>Thêm môn học mới bằng cách điền các thông tin sau</Form.Label>
//             <TextField
//               sx={{ marginTop: "0.5rem" }}
//               fullWidth
//               autoComplete="off"
//               inputRef={fields.name.ref}
//               {...fields.name}
//               label="Tên môn học"
//               error={!!errors.name}
//               helperText={(errors.name?.message as string) ?? ""}
//             />
//             <TextField
//               sx={{ marginTop: "0.5rem" }}
//               fullWidth
//               autoComplete="off"
//               inputRef={fields.abbrev.ref}
//               {...fields.abbrev}
//               label="Tên viết tắt"
//               error={!!errors.abbrev}
//               helperText={(errors.abbrev?.message as string) ?? ""}
//             />
//             <TextField
//               sx={{ marginTop: "0.5rem" }}
//               fullWidth
//               autoComplete="off"
//               inputRef={fields.schoolabbrev.ref}
//               {...fields.schoolabbrev}
//               label="Tên viết tắt trường"
//               error={!!errors.schoolabbrev}
//               helperText={(errors.schoolabbrev?.message as string) ?? ""}
//             />
//             <TextField
//               sx={{ marginTop: "0.5rem" }}
//               fullWidth
//               autoComplete="off"
//               inputRef={fields.imgurl.ref}
//               {...fields.imgurl}
//               label="URL hình ảnh"
//               error={!!errors.imgurl}
//               helperText={(errors.imgurl?.message as string) ?? ""}
//             />
//             <TextField
//               sx={{ marginTop: "0.5rem" }}
//               fullWidth
//               autoComplete="off"
//               inputRef={fields.description.ref}
//               {...fields.description}
//               label="Mô tả"
//               error={!!errors.description}
//               helperText={(errors.description?.message as string) ?? ""}
//             />
//             <Button variant="primary" type="submit" style={{ margin: "1rem auto 0", display: "block" }}>Submit</Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }
