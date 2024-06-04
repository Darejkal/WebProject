import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';

export interface IServiceSubjectInstanceUser{
    subjectid:string,
    name:string,
    createdat:string,
    uuid:string,
    authorName:string,
    subjectName:string,
    subjectAbbrev:string,
}
interface IServiceSubjectInstanceUserStore {
    subjectinstanceuser?:IServiceSubjectInstanceUser,
    subjectinstanceusers?:IServiceSubjectInstanceUser[],
    nextPage?:string,
    paginationEnded?:Boolean
}
const initialState = {
};
const subjectUserStore = create<IServiceSubjectInstanceUserStore>(() => initialState);
interface IServiceSubjectInstanceUserservice extends IServiceSubjectInstanceUserStore {
    create:(subjectabbrev:string,name:string)=>Promise<any>,
    // getallCurrent:()=>Promise<IServiceSubjectUser[]>,
    // getOne:(uuid:string)=>Promise<IServiceSubjectUser>,
	getPaginated: (props:{limit:number,next?:string|undefined,query?:string}) => Promise<IServiceSubjectInstanceUser[]|undefined>,
    clearPage:()=>Promise<void>
}
export function useSubjectInstanceUserService(): IServiceSubjectInstanceUserservice {
    const subjectUserStoreValues=subjectUserStore()
    const fetch = useFetch();

    return {
        ...subjectUserStoreValues,
        create:async function (subjectabbrev:string,name:string) {
            return await fetch.post("/api/subjectinstance/user/create",{
                subjectabbrev,name
            })     
        },
		getPaginated: async (props) => {
            let {limit,query}=props
            if(props.next===""){
                subjectUserStore.setState({subjectinstanceusers:[],nextPage:undefined})
                subjectUserStoreValues.subjectinstanceusers=[]
                subjectUserStoreValues.nextPage=undefined
            }
            let {results,next}:{next:string, results:IServiceSubjectInstanceUser[] }=await fetch.post('/api/subjectinstance/user/getpaginated',
                {
                    limit,
                    next:props.next??subjectUserStoreValues.nextPage,
                    query:query
                }
            )
            if(results.length==0){
                subjectUserStore.setState({paginationEnded:true})
            } else{
		        subjectUserStore.setState({ 
                    subjectinstanceusers: [...(subjectUserStoreValues.subjectinstanceusers??[]),...results]
                        .sort(
                            (a,b)=>(a.uuid>b.uuid?1:0)
                        ).reduce((pre,cur)=>{
                            if(pre.length==0||pre[pre.length-1].uuid!=cur.uuid){
                                pre.push(cur);
                            }
                            return pre;
                        },[] as IServiceSubjectInstanceUser[]),
                    nextPage:next 
                });
            }
			return results
		}, 
        clearPage:async ()=>{
            subjectUserStore.setState({subjectinstanceusers:[],nextPage:undefined})
            subjectUserStoreValues.subjectinstanceusers=[]
            subjectUserStoreValues.nextPage=undefined
        }
    }
};

