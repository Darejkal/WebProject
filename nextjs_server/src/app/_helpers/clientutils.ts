import { format, toZonedTime } from 'date-fns-tz';

export function formatDateString(dateStr: string): string {
    try{
        const timeZone = 'Asia/Ho_Chi_Minh'; // Timezone for UTC+7
        const dateObj = new Date(dateStr);
        const zonedDate = toZonedTime(dateObj, timeZone);
    
        const formatString = "HH:mm:ss d/M/yyyy ('GMT+7')";
        
        return format(zonedDate, formatString, { timeZone });
    }catch(e){
        return "N/A"
    }
}