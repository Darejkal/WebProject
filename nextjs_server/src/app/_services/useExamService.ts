import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';


interface IExamStore {
}
const initialState = {

};
const subjectStore = create<IExamStore>(() => initialState);
interface IExamService extends IExamStore {
}
export function useExamService(): IExamService {
    const userService = useUserService();
    const fetch = useFetch();

    return {
        
    }
};

