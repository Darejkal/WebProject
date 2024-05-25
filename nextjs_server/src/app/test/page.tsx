'use client'

import AppTable from '../_components/CourseTable';
import { types } from "joi";
const initialCourses: ICourses[] = [
    { id: 1, name: 'John Doe', code: 20, link: 'john@example.com' },
    { id: 2, name: 'Jane Doe', code: 22, link: 'jane@example.com' },
];

export default function AListClassPage() {

    return (
        <div>
            <h1>test</h1>
            <AppTable courses={initialCourses} />
        </div>

    );
}