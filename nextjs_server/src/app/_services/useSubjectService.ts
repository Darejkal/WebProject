import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';
import { result } from 'lodash';


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
    nextPage?:string,
    paginationEnded?:Boolean
}
const initialState = {};
const subjectStore = create<ISubjectStore>(() => initialState);
interface ISubjectAction {
    create:(params:{name:string, abbrev:string, schoolabbrev:string})=>Promise<ISubjectStore|undefined>,
	getPaginated: (props:{limit:number,next?:string|undefined,query?:string}) => Promise<IServiceSubject[]|undefined>,
    clearPage:()=>Promise<void>
}
export function useSubjectService(): ISubjectAction&ISubjectStore {
    const userService = useUserService();
    const fetch = useFetch();
    const subjectStoreValues=subjectStore()
    return {
        ...subjectStoreValues,
        create: async function({name,abbrev,schoolabbrev}){
            try{
            let school=await fetch.post("/api/subject/create",{name,abbrev,schoolabbrev})
            return school
            } catch(e:any){
                throw "Tạo môn học mới thất bại."
            }
        },
		getPaginated: async (props) => {
            let {limit,query}=props
            if(props.next===""){
                subjectStore.setState({subjects:[],nextPage:undefined})
                subjectStoreValues.subjects=[]
                subjectStoreValues.nextPage=undefined
            }
            let {results,next}:{next:string, results:IServiceSubject[] }=await fetch.post('/api/subject/getpaginated',
                {
                    limit,
                    next:props.next??subjectStoreValues.nextPage,
                    query:query
                }
            )
            if(results.length==0){
                subjectStore.setState({paginationEnded:true})
            } else{
		        subjectStore.setState({ 
                    subjects: [...(subjectStoreValues.subjects??[]),...results]
                        .sort(
                            (a,b)=>(a.uuid>b.uuid?1:0)
                        ).reduce((pre,cur)=>{
                            if(pre.length==0||pre[pre.length-1].uuid!=cur.uuid){
                                pre.push(cur);
                            }
                            return pre;
                        },[] as IServiceSubject[]),
                    nextPage:next 
                });
                // subjectInstanceStore.setState({ 
                //     subjectinstances: Array.from(new Set([...(subjectInstanceStoreValues.subjectinstances??[]),...results])),
                //     nextPage:next 
                // });
            }
            return results;
        },
        clearPage: async ()=>{
            subjectStore.setState({subjects:[],nextPage:undefined})
            subjectStoreValues.nextPage=undefined
            subjectStoreValues.subjects=[]
        }
    }
};

