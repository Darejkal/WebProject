'use client'
import { useUserService } from '@/app/_services';
import { Suspense, useEffect, useState } from 'react';

export default function TeacherLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>){
    return <div>
        {children}
    </div>
}