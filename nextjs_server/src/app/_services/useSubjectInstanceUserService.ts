import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';

export interface IServiceSubjectInstanceUser{
    uuid: string,
    userid: string,
    subjectinstanceid: string,
    role: string,
    createdat: string,
    username: string,
    useremail:string,
    subjectinstancename: string,
    subjectabbrev: string,
}
interface IServiceSubjectInstanceUserStore {
    subjectinstanceuser?:IServiceSubjectInstanceUser,
    subjectinstanceusers:Map<string, IServiceSubjectInstanceUser[]>,
    nextPage:Map<string,string>,
    paginationEnded?:Boolean
}
const initialState = {
    subjectinstanceusers: new Map(),
    nextPage: new Map()
};
const subjectUserStore = create<IServiceSubjectInstanceUserStore>(() => initialState);
interface IServiceSubjectInstanceUserservice extends IServiceSubjectInstanceUserStore {
    create:(subjectabbrev:string,name:string)=>Promise<any>,
    // getallCurrent:()=>Promise<IServiceSubjectUser[]>,
    // getOne:(uuid:string)=>Promise<IServiceSubjectUser>,
	getPaginated: (props:{limit:number,next?:string|undefined,query?:string,role:string,subjectinstanceid?:string}) => Promise<IServiceSubjectInstanceUser[]|undefined>,
    clearPage:(props:{role:string})=>Promise<void>,
    addMembers:(props:{userids:string[],subjectinstanceid:string,role:string})=>Promise<void>,
}
export function useSubjectInstanceUserService(): IServiceSubjectInstanceUserservice {
    const subjectUserStoreValues=subjectUserStore()
    const fetch = useFetch();

    return {
        ...subjectUserStoreValues,
        create:async function (subjectabbrev:string,name:string) {
            return await fetch.post("/api/subjectinstance/userrelation/create",{
                subjectabbrev,name
            })     
        },
		getPaginated: async (props) => {
            let {limit,query,role,subjectinstanceid}=props
            if(props.next===""){
                subjectUserStoreValues.subjectinstanceusers.delete(role)
                subjectUserStoreValues.nextPage.delete(role)
                subjectUserStore.setState({subjectinstanceusers:subjectUserStoreValues.subjectinstanceusers,nextPage:subjectUserStoreValues.nextPage})
            }
            let {results,next}:{next:string, results:IServiceSubjectInstanceUser[] }=await fetch.post('/api/subjectinstance/userrelation/getpaginated',
                {
                    limit,
                    next:props.next??subjectUserStoreValues.nextPage.get(role),
                    query:query,
                    role:role,
                    subjectinstanceid:subjectinstanceid
                }
            )
            if(results.length==0){
                subjectUserStore.setState({paginationEnded:true})
            } else{
                subjectUserStoreValues
                    .subjectinstanceusers
                    .set(role,[...subjectUserStoreValues.subjectinstanceusers
                        .get(role)??[],...results].sort(
                            (a,b)=>(a.uuid>b.uuid?1:0)
                        ).reduce((pre,cur)=>{
                            if(pre.length==0||pre[pre.length-1].uuid!=cur.uuid){
                                pre.push(cur);
                            }
                            return pre;
                        },[] as IServiceSubjectInstanceUser[]))
                    subjectUserStoreValues.nextPage.set(role,next)
		        subjectUserStore.setState({ 
                    subjectinstanceusers: subjectUserStoreValues.subjectinstanceusers,
                    nextPage:subjectUserStoreValues.nextPage 
                });
            }
			return results
		}, 
        clearPage:async ({role}:{role:string})=>{
            subjectUserStoreValues.subjectinstanceusers.delete(role,)
            subjectUserStoreValues.nextPage.delete(role)
            subjectUserStore.setState({subjectinstanceusers:subjectUserStoreValues.subjectinstanceusers,nextPage:subjectUserStoreValues.nextPage})
        },
        addMembers:async (props)=>{
            return await fetch.post("/api/subjectinstance/addmembers",props)
        }
    }
};

