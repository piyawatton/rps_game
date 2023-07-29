import { NextResponse, NextRequest } from 'next/server'

const DEFAULT_LOCALE = 'en';
let locales = ['en', 'nl']

// Get the preferred locale, similar to above or using a library
function getLocale(request: NextRequest) {
  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|static|favicon.ico|images|fonts|_next|assets)[^.]*)',
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}