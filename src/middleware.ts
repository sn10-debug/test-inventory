import { request } from 'http';
import {NextResponse,NextRequest} from 'next/server';

export async function middleware(req: NextRequest) {
    const{pathname} = req.nextUrl;
    const authToken=req.cookies.get('token')?.value;
    const loggedInUserAccessToken=
        req.nextUrl.pathname === '/login' ||
        req.nextUrl.pathname === '/login/error' ||
        req.nextUrl.pathname === '/login/forgotpassword' ||
        req.nextUrl.pathname === '/signup';
    if (pathname === '/') {
        const destination="/listings";
        const url=new URL(destination,req.url);
        return NextResponse.rewrite(url);
    }    
    /*if(pathname.startsWith('/login') && !authToken){
        const destination="/";
        const url=new URL(destination,req.url);
        return NextResponse.redirect(url);
    }
    else if(!loggedInUserAccessToken && authToken){
        const destination="/login";
        const url=new URL(destination,req.url);
        return NextResponse.redirect(url);
    }*/
    
    return NextResponse.next();
}

export const config = {
    matcher:["/", "/login/:path*", "/signup", "/landing", "/login/error", "/login/forgotpassword"]
}