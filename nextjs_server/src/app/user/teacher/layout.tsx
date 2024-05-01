'use client'
import AppHeader from '@/app/_components/users/teacher/app.header';
import AppFooter from '@/app/_components/users/teacher/app.footer';

export default function TeacherLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
    return <div >
        <AppHeader />
        {children}
        <AppFooter />
    </div>
}