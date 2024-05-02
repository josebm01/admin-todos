'use client'

import { getCookie, hasCookie } from "cookies-next"

/**
 * cookie: cart 
 {
    'uui-123-1': 4, 
    'uui-123-2': 2, 
    'uui-123-3': 1, 
 }
 */

// construyendo objeto con los id de los productos y la cantidad agregadas
export const getCookieCart = (): { [id: string]: number } => {

    // validando si hay cookies con los productos
    if ( hasCookie('cart')) {
        const cookieCart = JSON.parse( getCookie('cart') as string ?? '{}' )
        return cookieCart
    }

    return {}
}


export const addProductToCart = ( id: string ) => {
    
}