import { create } from 'zustand';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAlertService,useUserService } from '.';
import { useFetch } from '@/app/_helpers/client';


interface IAttendanceStore {
}
const initialState = {
};
const attendanceStore = create<IAttendanceStore>(() => initialState);
interface IAttendanceService extends IAttendanceStore {
    createAttendanceUUID: (subjectinstanceid:string) => Promise<any>,
    checkin:(attendanceUUID:string)=>Promise<void>
}
export function useAttendanceService(): IAttendanceService {
    const userService = useUserService();
    const fetch = useFetch();

    return {
       createAttendanceUUID: async (subjectinstanceid:string) => {
            let userid=userService.currentUser?.id;
            if(!userid){
                throw "not loggedin error"
            }
            return await fetch.post("/api/attendance/create",{
                subjectinstanceid,
                userid
            })
        },
        checkin: async(attendanceUUID:string)=>{
            return await fetch.post("/api/attendance/checkin",{
                attendanceUUID
            })
        }
    }
};

