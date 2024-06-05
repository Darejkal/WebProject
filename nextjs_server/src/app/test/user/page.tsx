"use client";

import React, { useCallback, useEffect, useState, UIEvent } from "react";
import { MaterialReactTable } from "material-react-table";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm, FieldError, Merge, FieldErrorsImpl } from "react-hook-form";
import { useUserService, IServiceUser } from "@/app/_services";

const UserManagementPage = () => {
  const userService = useUserService();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState<IServiceUser | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const fields = {
    name: register("name", { required: "Name is required" }),
    email: register("email", { required: "Email is required" }),
    password: register("password", { required: "Password is required" }),
    position: register("position", { required: "Position is required" }),
  };

  async function onSubmit(data: any) {
    if (isEdit && editUser) {
      // Handle user update logic
    } else {
      await userService.register(data);
    }
    setShowModal(false);
    reset();
    userService.getPaginated(20);
  }

  const fetchNextPage = useCallback((containerRefElement?: HTMLDivElement | null) => {
    if (containerRefElement) {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
      if (scrollHeight - scrollTop - clientHeight < 400 && !isFetching) {
        setIsFetching(true);
        userService.getPaginated(20).then(() => {
          setIsFetching(false);
        });
      }
    }
  }, [isFetching, userService]);

  useEffect(() => {
    userService.getPaginated(20);
  }, []);

  const [userTableData, setUserTableData] = useState<IServiceUser[]>([]);

  useEffect(() => {
    if (userService.users) {
      setUserTableData(userService.users);
    }
  }, [userService.users]);

  const handleEditUser = (user: IServiceUser) => {
    setIsEdit(true);
    setEditUser(user);
    setShowModal(true);
    reset(user);
  };

  const renderError = (
    error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  ) => {
    if (typeof error === "string") {
      return <p>{error}</p>;
    }
    return null;
  };

  return (
    <div style={{ margin: "3rem 10rem 0 10rem" }}>
      <h4 style={{ display: "block", paddingBottom: "1rem" }}>Quản lý người dùng</h4>
      <MaterialReactTable
        columns={[
          { accessorKey: "name", header: "Tên" },
          { accessorKey: "email", header: "Email" },
          { accessorKey: "position", header: "Vị trí" },
          { accessorKey: "uuid", header: "UUID" },
        ]}
        data={userTableData}
        enablePagination={false}
        enableRowNumbers={true}
        state={{
          showProgressBars: isFetching,
        }}
        muiTableContainerProps={{
          sx: {
            maxHeight: "20rem",
          },
          onScroll: (event: UIEvent<HTMLDivElement>) => fetchNextPage(event.target as HTMLDivElement),
        }}
        renderRowActions={({ row }) => (
          <Button
            variant="outline-primary"
            onClick={() => handleEditUser(row.original as IServiceUser)}
          >
            Chỉnh sửa
          </Button>
        )}
      />
      <div
        style={{
          margin: "1rem 0 0 0",
          width: "100%",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button variant="outline-primary" onClick={() => {
          setIsEdit(false);
          setEditUser(null);
          setShowModal(true);
          reset();
        }}>
          Thêm người dùng
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="name">
              <Form.Label>Tên</Form.Label>
              <Form.Control type="text" {...fields.name} />
              {renderError(errors.name)}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" {...fields.email} />
              {renderError(errors.email)}
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" {...fields.password} />
              {renderError(errors.password)}
            </Form.Group>
            <Form.Group controlId="position">
              <Form.Label>Vị trí</Form.Label>
              <Form.Control type="text" {...fields.position} />
              {renderError(errors.position)}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: "1rem auto 0", display: "block" }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
