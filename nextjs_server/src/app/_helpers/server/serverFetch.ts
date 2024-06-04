import { redirect } from "next/navigation";

export { serverFetch };

function serverFetch() {
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };

    function request(method: string) {
        return (url: string | URL | Request, body?: any,headers?:any,other_options?:any) => {
            let requestOptions: any = {
                method
            };
            if (body) {
                requestOptions.headers = { 'Content-Type': 'application/json'};
                requestOptions.body = JSON.stringify(body);
            }
            requestOptions.headers={...requestOptions.headers,...headers}
            if (other_options){
                requestOptions={...requestOptions,...other_options}
            }
            return fetch(url, requestOptions).then(handleResponse);
        }
    }

    // helper functions

    async function handleResponse(response: Response) {
        const isJson = response.headers?.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;
        // check for error response
        if (!response.ok) {
            if (response.status === 401) {
                // api auto logs out on 401 Unauthorized, so redirect to login page
                redirect('/login');
            }

            // get error message from body or default to response status
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    }
}