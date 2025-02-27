import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

async function toEx(request: NextRequest) {
  /* Acá me fijo si viene de una url distinta a backoffice y luego valido el rol */
  try {

    const cookie = request.cookies.get('Cookie2')?.value
    console.log(cookie)
    if (cookie) {

      return NextResponse.next();

    } else return NextResponse.redirect(new URL('/', request.url));

  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/', request.url));
  }

}

async function toSinex(request: NextRequest) {
  /* Acá me fijo si viene de una url distinta a backoffice y luego valido el rol */
  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('Cookie1')?.value
    console.log(cookie)

    if (cookie) {

      return NextResponse.next();

    } else return NextResponse.redirect(new URL('/', request.url));

  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/', request.url));
  }

}

export async function middleware(request: NextRequest) {

  try {
    if (request.nextUrl.pathname.startsWith('/Ex')) {
      return toEx(request)
    } else {
      return toSinex(request)
    }
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/Ex/s', '/Sinex/s'],
}