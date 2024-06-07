import { create } from "zustand";
import { useRouter, useSearchParams } from "next/navigation";
import { useAlertService, useUserService } from ".";
import { useFetch } from "@/app/_helpers/client";

export interface IServiceExam {
	uuid: string;
	name: string;
	createdat: string;
	questionids?: string[];
	category: string;
}
export interface IServiceQuestion {
	uuid: string;
	question: string;
	options?: {
		text: string;
		score: number;
		uuid: string;
	}[];
	createdat: string;
	category: string;
}
export interface IServiceExamInstance{
	uuid:string;
	examid:string;
	subjectinstanceid:string;
	createdat:string;
	endtime?:string;
	description?:string;
	name?:string;
	authorid:string;
}
interface IExamStore {
	exam?: IServiceExam;
}
const initialState = {};
const subjectStore = create<IExamStore>(() => initialState);
interface IExamService extends IExamStore {
	addExam: (exam: Omit<IServiceExam, "uuid" | "createdat">) => Promise<void>;
}
export function useExamService(): IExamService {
	const userService = useUserService();
	const fetch = useFetch();

	return {
		addExam: (exam) => {
			return fetch.post("/api/exam/create", exam);
		},
	};
}
