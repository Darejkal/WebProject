'use client'
import Table from "react-bootstrap/Table";
import { Button, Container } from "react-bootstrap";
import { useState } from "react";
import CreateModal from "./ModalTest";
interface IProps {
    courses: ICourses[] | null
}

const AppTable = (props: IProps) => {
    const { courses } = props;

    const [showModalCreate, setShowModalCreate] = useState(false);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Container>
                <div className='mb-3' style={{ display: "flex", justifyContent: "space-between" }} >
                    <h3>Class List</h3>
                    <Button variant="secondary" onClick={() => setShowModalCreate(true)}>Create Class</Button>
                </div>
                <Table bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Course Name</th>
                            <th>Course Code</th>
                            <th>Link</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {courses?.map(course => {
                            return (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.name}</td>
                                    <td>{course.code}</td>
                                    <td><a href={course.link} target="_blank" rel="noopener noreferrer">{course.link}</a></td>
                                    <td>
                                        <Button>View</Button>
                                        <Button variant="warning" className="mx-3">Edit</Button>
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>


                            )
                        })}

                    </tbody>
                </Table>

                <CreateModal
                    showModalCreate={showModalCreate}
                    setShowModalCreate={setShowModalCreate}
                ></CreateModal>

            </Container>
        </div>
    )
}

export default AppTable;