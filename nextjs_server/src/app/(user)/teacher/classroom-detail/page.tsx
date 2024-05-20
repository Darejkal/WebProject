'use client'

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Alert } from "react-bootstrap";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DetailClassPage(){
    const [show, setShow] = useState(false);

    return (<div className="">
        <h3 className="m-2">Chi tiết lớp học</h3>
        <div className="d-flex flex-column h-100 w-50 justify-content-center align-items-center mx-5">
            <Table striped bordered hover variant="warning" size="xl">
                <tbody>
                    <tr>
                        <th>Tên lớp học</th>
                        <th>...</th>
                    </tr>
                    <tr>
                        <th>Mã code</th>
                        <th>...</th>
                    </tr>
                    <tr>
                        <th>Tên giáo viên</th>
                        <th>...</th>
                    </tr>
                </tbody>
            </Table>
        </div>

        <Button variant="outline-danger">Tạo phiếu điểm danh</Button>

        <h3 className="m-2">Danh sách học sinh</h3>
        <Table striped bordered hover variant="success">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Họ và tên</th>
                    <th>MSSV</th>
                    <th>Email</th>
                    <th>Số buổi vắng</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td className="justify-content-center align-items-center d-flex flex-row w-3">
                        <form action="" method="post">
                            <Button onClick={() => setShow(true)}>Xóa khỏi lớp</Button>
                        </form>
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td>Demo</td>
                    <td></td>
                </tr>
                {/* for */}
                
            </tbody>
        </Table>
        
    </div>);
}