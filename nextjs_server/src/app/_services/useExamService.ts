import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';


interface ISubjectStore {
}
const initialState = {

};
const subjectStore = create<ISubjectStore>(() => initialState);
interface ISubjectService extends ISubjectStore {
}
export function useSubjectService(): ISubjectService {
    const userService = useUserService();
    const fetch = useFetch();

    return {
        
    }
};

