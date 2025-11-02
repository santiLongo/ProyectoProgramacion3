import { Request } from "express";

export type RequestWithBody<T = any> = Request<
    Record<string, string>,
    any,                    // response body
    T,                      // request body
    Record<string, any>     // query params
>

export type RequestWithParams<P, B = any> = Request<
    P,   // params
    any, // res body
    B,   // req body
    Record<string, any>
>;

