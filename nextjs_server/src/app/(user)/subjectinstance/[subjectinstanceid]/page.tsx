"use client";

import {
	IServiceSubjectInstance,
	useSubjectInstanceService,
} from "@/app/_services";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SubjectInstancePage() {
	const router = useRouter();
	const { subjectinstanceid }: { subjectinstanceid: string } = useParams();
	const subjectInstanceService = useSubjectInstanceService();
	const [subjectinstance, setSubjectInstance] =
		useState<IServiceSubjectInstance>();
	const [isLoading, setIsLoading] = useState<boolean>();
	const getSubjectInstance = useCallback(() => {
		console.log(subjectinstanceid);
		subjectInstanceService
			.getOne(subjectinstanceid)
			.then((v) => {
				setSubjectInstance(v);
			})
			.catch((e) => {
				toast.info("Không tìm thấy lớp học được chỉ định. Đang điều hướng...");
				router.push("/dashboard");
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [subjectinstanceid, subjectInstanceService]);
	useEffect(() => {
		getSubjectInstance();
	}, []);
	return <>{subjectinstanceid}</>;
}
