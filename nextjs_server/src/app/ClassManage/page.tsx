'use client'

import AppTable from './components/CourseTable';
import { Button, Container } from 'react-bootstrap';
import { types } from "joi";
import CreateModal from './components/ModalTest';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import { useState } from 'react';
import { toast } from 'react-toastify';

const initialCourses: ICourses[] = [
    { id: 1, name: 'Mhmmmhm', code: 20, link: 'LopHoc2', students: ['ban 1', 'ban 2'] },
    { id: 2, name: 'Math', code: 22, link: 'https://www.youtube.com', students: ['ban 3', 'ban 4'] }
];


export default function ClassList() {
    const [data, setData] = useState<ICourses[]>(initialCourses);

    const handleAddCourse = (newCourse: Omit<ICourses, 'id'>) => {
        const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
        const newData = { id: newId, ...newCourse };
        setData([...data, newData]);
        toast.success("Create succeeded!");
    };

    return (
        <div>
            <AppTable courses={data} handleAddCourse={handleAddCourse} />
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