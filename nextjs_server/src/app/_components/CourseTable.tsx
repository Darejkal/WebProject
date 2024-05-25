'use client'
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
interface IProps {
    courses: ICourses[] | null
}

const AppTable = (props: IProps) => {
    const { courses } = props;
    return (
        <Table bordered hover size="sm">
            <thead>
                <tr>No</tr>
                <tr>Course Name</tr>
                <tr>Course Code</tr>
                <tr>Link</tr>
            </thead>
            <tbody>

                {courses?.map(course => {
                    return (
                        <tr key={course.id}>
                            <td>{course.id}</td>
                            <td>{course.name}</td>
                            <td>{course.code}</td>
                            <td>{course.link}</td>
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
    )
}

export default AppTable;