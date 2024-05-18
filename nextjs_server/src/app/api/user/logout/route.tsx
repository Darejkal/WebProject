import { apiHandler } from '@/app/_helpers/server/middleware';
import { cookies } from 'next/headers';


module.exports = apiHandler({
    POST: logout
});

function logout(req:Request) {
    cookies().delete('authorization');
}