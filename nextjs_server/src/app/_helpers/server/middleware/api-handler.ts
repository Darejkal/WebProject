import { NextRequest, NextResponse } from 'next/server';
import joi from 'joi';
import { errorHandler, jwtMiddleware, validateBodyMiddleware } from '.';
type HandlerFunc={
    (req:NextRequest,...args:any):any,
    schema?:joi.ObjectSchema
    position?:string,
    ispublic?:Boolean
}
type APIHandlerType={
    GET?:HandlerFunc,
    POST?:HandlerFunc,
    PUT?:HandlerFunc,
    PATCH?:HandlerFunc,
    DELETE?:HandlerFunc,
}
export function apiHandler(handler:APIHandlerType) {
    const wrappedHandler: any = {};
    const httpMethods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

    // wrap handler methods to add middleware and global error handler
    httpMethods.forEach(method => {
        if (typeof handler[method] !== 'function'){
            return;
        }

        wrappedHandler[method] = async (req: NextRequest, ...args: any) => {
            try {
                // monkey patch req.json() because it can only be called once
                const json = await req.json();
                req.json = () => json;
            } catch {}

            try {
                // global middleware
                await jwtMiddleware(req,{
                    position:handler[method]?.position,
                    ispublic:handler[method]?.ispublic
                });
                await validateBodyMiddleware(req, handler[method]!.schema);

                // route handler
                const responseBody = await handler[method]!(req, ...args);
                return NextResponse.json(responseBody || {});
            } catch (err: any) {
                console.log(err)
                // global error handler
                return errorHandler(err);
            }
        };
    });

    return wrappedHandler;
}
