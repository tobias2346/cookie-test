"use server"
import { cookies } from "next/headers"

export const getCookie = async (cookieName: string) => {

  try {
    const cookieStore = await cookies();
    const cookie = await cookieStore.get(cookieName)
    return cookie?.value;
  } catch (error) {
    console.log(error)
    return 'error'
  }

}

export const setCookie = async (name: string, value: string) => {

  try {
    const cookieStore = await cookies();
    await cookieStore.set(name, value)
  } catch (error) {
    console.log(error)
    return null
  }

}

export const setCookieE = async (name: string, value: string) => {

  try {
    const cookieStore = await cookies();
    await cookieStore.set(name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge : 3600
    }
    )
  } catch (error) {
    console.log(error)

    return null
  }

}

export const deleteCookie = async (cookieName: string) => {

  try {
    const cookieStore = await cookies();
    await cookieStore.delete(cookieName);
    return 'eliminada'
  } catch (error) {
    console.log(error)

    return 'error'
  }

}