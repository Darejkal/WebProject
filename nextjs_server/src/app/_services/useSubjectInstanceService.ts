import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';

export interface IServiceSubjectInstance{
    subjectid:string,
    name:string,
    createdat:string,
    uuid:string,
    authorName:string,
    subjectName:string,
    subjectAbbrev:string,
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
    getallCurrent:()=>Promise<IServiceSubjectInstance[]>,
    getOne:(uuid:string)=>Promise<IServiceSubjectInstance>,
	getPaginated: (props:{limit:number,next?:string|undefined,query?:string}) => Promise<IServiceSubjectInstance[]|undefined>,
    clearPage:()=>Promise<void>,
    deleteByUUID:(uuid:string)=>Promise<void>;
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
        getOne:async function (uuid) {
            return await fetch.get(`/api/subjectinstance/get/${uuid}`)     
        },
		getPaginated: async (props) => {
            let {limit,query}=props
            if(props.next===""){
                subjectInstanceStore.setState({subjectinstances:[],nextPage:undefined})
                subjectInstanceStoreValues.subjectinstances=[]
                subjectInstanceStoreValues.nextPage=undefined
            }
            let {results,next}:{next:string, results:IServiceSubjectInstance[] }=await fetch.post('/api/subjectinstance/getpaginated',
                {
                    limit,
                    next:props.next??subjectInstanceStoreValues.nextPage,
                    query:query
                }
            )
            if(results.length==0){
                subjectInstanceStore.setState({paginationEnded:true})
            } else{
		        subjectInstanceStore.setState({ 
                    subjectinstances: [...(subjectInstanceStoreValues.subjectinstances??[]),...results]
                        .sort(
                            (a,b)=>(a.uuid>b.uuid?1:0)
                        ).reduce((pre,cur)=>{
                            if(pre.length==0||pre[pre.length-1].uuid!=cur.uuid){
                                pre.push(cur);
                            }
                            return pre;
                        },[] as IServiceSubjectInstance[]),
                    nextPage:next 
                });
                // subjectInstanceStore.setState({ 
                //     subjectinstances: Array.from(new Set([...(subjectInstanceStoreValues.subjectinstances??[]),...results])),
                //     nextPage:next 
                // });
            }
			return results
		}, clearPage:async ()=>{
            subjectInstanceStore.setState({subjectinstances:[],nextPage:undefined})
            subjectInstanceStoreValues.subjectinstances=[]
            subjectInstanceStoreValues.nextPage=undefined
        },
        deleteByUUID:async(uuid:string)=>{
            return await fetch.post("/api/subjectinstance/delete",{uuid});
        }
    }
};

