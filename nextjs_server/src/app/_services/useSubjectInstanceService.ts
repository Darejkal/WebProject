import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';

export interface IServiceSubjectInstance{
    subjectid:string,
    name:string,
    createdat:Date,
    uuid:string,
    authorid:string
    subjectAbbrev:string
}
interface IServiceSubjectInstanceStore {
    subjectinstance?:IServiceSubjectInstance,
    subjectinstances?:IServiceSubjectInstance[],
    nextPage?:string,
    paginationEnded?:Boolean
}
const initialState = {
};
const subjectInstanceStore = create<IServiceSubjectInstanceStore>(() => initialState);
interface IServiceSubjectInstanceService extends IServiceSubjectInstanceStore {
    create:(subjectabbrev:string,name:string)=>Promise<any>,
    getallCurrent:()=>Promise<any>,
	getPaginated: (limit:number,next?:string) => Promise<IServiceSubjectInstance[]|undefined>,
    clearPage:()=>Promise<void>
}
export function useSubjectInstanceService(): IServiceSubjectInstanceService {
    const userService = useUserService();
    const subjectInstanceStoreValues=subjectInstanceStore()
    const fetch = useFetch();

    return {
        ...subjectInstanceStoreValues,
        create:async function (subjectabbrev:string,name:string) {
            return await fetch.post("/api/subjectinstance/create",{
                subjectabbrev,name
            })     
        },
        getallCurrent:async function () {
            return await fetch.get("/api/subjectinstance/getallcurrent")     
        },
		getPaginated: async (limit) => {
            let {results,next}=await fetch.post('/api/subjectinstance/getpaginated',{limit,next:subjectInstanceStoreValues.nextPage})
            if(results.length==0){
                subjectInstanceStore.setState({paginationEnded:true})
            } else{
		        subjectInstanceStore.setState({ subjectinstances: [...(subjectInstanceStoreValues.subjectinstances??[]),...results],nextPage:next });
            }
			return results
		}, clearPage:async ()=>{
            subjectInstanceStore.setState({subjectinstances:[],nextPage:undefined})
            subjectInstanceStoreValues.subjectinstances=[]
            subjectInstanceStoreValues.nextPage=undefined
        }
    }
};

