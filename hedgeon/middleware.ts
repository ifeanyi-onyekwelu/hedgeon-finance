// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { refreshApi } from './app/api/authApi';

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('jwt')?.value;

    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    if (!accessToken) {
        console.log('No access token found, checking refresh token.');
        if (refreshToken) {
            try {
                const refreshResponse = await refreshApi();
                console.log('Refresh Response:', refreshResponse);

                if (refreshResponse.status === 200) {
                    const response = NextResponse.next();
                    console.log('New Access Token:', refreshResponse);
                    return response;
                } else {
                    return NextResponse.redirect(new URL('/auth/login', req.url));
                }
            } catch (error) {
                console.error('Error during refresh attempt in middleware:', error);
                return NextResponse.redirect(new URL('/auth/login', req.url));
            }
        }
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        await jwtVerify(accessToken, secret);
        return NextResponse.next();
    } catch (error) {
        if (refreshToken) {
            console.log('Access token invalid, redirecting to login.');
        }
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ['/personal/:path*', '/admin/:path*'],
};