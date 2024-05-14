'use client'

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListClassPage(){
    return (<div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">
        <h3 className="m-4">Danh sách lớp học thuộc quản lý của <span>...</span></h3>
        <Table striped bordered hover variant="success">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Tên lớp</th>
                    <th>Mã lớp</th>
                    <th>Mã code</th>
                    <th>Link vào lớp</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td><a href="/user/teacher/classroom-detail">Demo</a></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td><a href="/user/teacher/classroom-detail">Demo</a></td>
                </tr>
                {/* for */}
                
            </tbody>
        </Table>
    </div>);
}