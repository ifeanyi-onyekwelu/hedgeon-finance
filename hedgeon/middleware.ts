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
        console.log('No access token found.');
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
        const { payload }: any = await jwtVerify(accessToken, secret);

        console.log("Payload", payload)

        const role = payload.user.role;
        console.log("User Role", role)

        const urlPath = req.nextUrl.pathname;

        // ✅ Role-based checks
        if (urlPath.startsWith('/admin') && role !== 'admin') {
            return NextResponse.redirect(new URL('/unauthorized', req.url)); // or /auth/login
        }

        if (urlPath.startsWith('/personal') && role !== 'user') {
            return NextResponse.redirect(new URL('/unauthorized', req.url)); // or /auth/login
        }

        return NextResponse.next();
    } catch (error) {
        console.log('Token invalid or expired.');
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ['/personal/:path*', '/admin/:path*'],
};
