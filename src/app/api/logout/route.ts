import { getToken } from 'next-auth/jwt';
import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {

  // This is to check the auth token
  const authToken = await getToken({ req, secret });


  // Get all cookies from the request
  const allCookies = req.cookies as any;

  // Create an array to hold the serialized cookies with expired dates
  const cookies = Object.keys(Object.fromEntries(allCookies['_parsed'])).map(cookieName =>{
   return serialize(cookieName, '', {
      maxAge: -1,
      path: '/',
    })
  }
  );

  // Create the response
  const response = new NextResponse(null, {
    status: 302, // Redirect status
    headers: {
      'Location': req.headers.get('Referer') || '/', // Redirect to the Referer or home if Referer is not present
    },
  });

  // Set each cookie in the response headers
  cookies.forEach(cookie => response.headers.append('Set-Cookie', cookie));

  return response;
}
