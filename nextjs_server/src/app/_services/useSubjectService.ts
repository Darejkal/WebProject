import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';


export interface IServiceSubject{
    name:string,
    abbrev:string,
    createdat:Date,
    uuid:string,
    authorid:string,
    schoolid:string
}
interface ISubjectStore{
    subject?:IServiceSubject,
    subjects?:IServiceSubject[],
    nextSubjectPage?:string,
    paginationEnded?:Boolean
}
const initialState = {};
const subjectStore = create<ISubjectStore>(() => initialState);
interface ISubjectAction {
    create:(params:{name:string, abbrev:string, schoolid:string})=>Promise<ISubjectStore|undefined>,
	getPaginated: (limit:number,next?:string) => Promise<IServiceSubject[]|undefined>,

}
export function useSubjectService(): ISubjectAction&ISubjectStore {
    const userService = useUserService();
    const alertService = useAlertService();
    const fetch = useFetch();
    const subjectStoreValues=subjectStore()
    return {
        ...subjectStoreValues,
        create: async function({name,abbrev,schoolid}){
            try{
            let school=await fetch.post("/api/subject/create",{name,abbrev,schoolid})
            return school
            } catch(e:any){
                alertService.error(e);
                return undefined
            }
        },
		getPaginated: async (limit) => {
            let {results,next}=await fetch.post('/api/subject/getpaginated',{limit,next:subjectStoreValues.nextSubjectPage})
            if(results.length==0){
                subjectStore.setState({paginationEnded:true})
            } else{
		        subjectStore.setState({ subjects: [...(subjectStoreValues.subjects??[]),...results],nextSubjectPage:next });
            }
			return results
		},
    }
};

