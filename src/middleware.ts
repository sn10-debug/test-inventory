"use client"
import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
    const authToken = await getToken({ req, secret });
    const { pathname } = req.nextUrl;

    

    // Allow public access only for these routes
    const publicPaths = [
        '/login',
        '/login/error',
        '/login/forgotpassword',
        '/signup',
        '/api/auth/signin', // This is necessary for the authentication flow
        '/api/auth/callback', // Needed for auth callback after signin
    ];

    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    if (isPublicPath) {
        if(authToken) {

            // Redirect to home page if user is already authenticated
            return NextResponse.redirect('/dashboard');
        }
        else return NextResponse.next();
    }

    // If the user is not authenticated, redirect to signin page
    if (!authToken) {
        const destination = `/api/auth/signin?callbackUrl=${pathname}`;
        const url = new URL(destination, req.url);
        return NextResponse.redirect(url);
    }

    if (pathname=='/'){
        const destination = `/dashboard`;
        const url = new URL(destination, req.url);
        return NextResponse.rewrite(url)
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api/auth).*)', // This matcher applies to all routes except `api/auth`
    ],
};
