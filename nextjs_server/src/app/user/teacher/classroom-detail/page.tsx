'use client'

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { Alert } from "react-bootstrap";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function DetailClassPage(){
    const [show, setShow] = useState(false);

    return (<div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center">

        <Table striped bordered hover variant="success">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Họ và tên</th>
                    <th>MSSV</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
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
                    <td></td>
                </tr>
                {/* for */}
                
            </tbody>
        </Table>
    </div>);
}