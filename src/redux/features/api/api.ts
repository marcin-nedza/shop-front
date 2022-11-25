import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
        baseUrl: 'http://localhost:4000/',
    // baseUrl:'https://shop-production-a4ae.up.railway.app/',
        credentials:'include',
        mode:"cors"
    })

const baseQueryWithReauth :BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError
>=async(args, api, extraOptions)=>{
    let result = await baseQuery(args, api, extraOptions)
    //Token is expired! We log out user and clear localStorage
    //@ts-ignore
    if(result?.error?.data?.error==='Unauthorized'){
        console.log("ERROR: " + result.error);
        localStorage.clear()
        // window.location.href = 'http://localhost:3000/account/login'
        window.location.href='https://shop-production-a4ae.up.railway.app/'
    }
    //@ts-ignore
    if(result?.error?.data?.error==='Access token is required'){
        // window.location.href = 'http://localhost:3000/account/login'
        console.log('ACC TOK REQ');
    }
return result
}

export const api = createApi({
    reducerPath:'api',
    baseQuery:baseQueryWithReauth,
    tagTypes:['Product','Category','Cart'],
    endpoints:builder=>({})
})
