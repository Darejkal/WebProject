'use client'

import AppTable from './components/CourseTable';
import { Button, Container } from 'react-bootstrap';
import { types } from "joi";
import CreateModal from './components/ModalTest';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
const initialCourses: ICourses[] = [
    { id: 1, name: 'Mhmmmhm', code: 'b20', link: 'LopHoc2', students: ['ban 1', 'ban 2'] },
    { id: 2, name: 'Math', code: 'a22', link: 'https://www.youtube.com', students: ['ban 3', 'ban 4'] },
];

export default function ClassList() {

    return (
        <div>
            <AppTable courses={initialCourses} />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}