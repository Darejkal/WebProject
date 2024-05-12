'use client'

import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateClassPage(){
    return (<div className="d-flex flex-column justify-content-center align-items-center">
        <form action="" method="" className="card">
            <b>Tạo lớp học mới</b>
            <div>
                <label htmlFor="">Tên lớp học</label>
                <input type="text" name=""/>
            </div>

            <div>
                <label htmlFor="">Mã code</label>
                <input type="text" />
            </div>

            <input type="submit" value='Tạo lớp học'/>
        </form>
    </div>);
}