import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';

interface IServiceSubjectInstance{

}
interface IServiceSubjectInstanceStore {
    subjects?:IServiceSubjectInstance[]
}
const initialState = {
    subjects:undefined
};
const subjectInstanceStore = create<IServiceSubjectInstanceStore>(() => initialState);
interface IServiceSubjectInstanceService extends IServiceSubjectInstanceStore {
    create:(subjectid:string,name:string)=>any,

}
export function useSubjectInstanceService(): IServiceSubjectInstanceService {
    const userService = useUserService();
    const fetch = useFetch();

    return {
        create:async function (subjectid:string,name:string) {
            return await fetch.post("/api/subject/instance/create",{
                subjectid,name
            })     
        },
    }
};

