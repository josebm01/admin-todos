'use client'

import { getCookie, hasCookie, setCookie } from "cookies-next"

/**
 * cookie: cart 
 {
    'uui-123-1': 4, 
    'uui-123-2': 2, 
    'uui-123-3': 1, 
 }
 */


// obteniendo productos de las cookies
export const getCookieCart = (): { [id: string]: number } => {

    // validando si hay cookies con los productos
    if ( hasCookie('cart')) {
        const cookieCart = JSON.parse( getCookie('cart') as string ?? '{}' )
        return cookieCart
    }

    return {}
}

// agregando nuevo producto al carrito
export const addProductToCart = ( id: string ) => {
    const cookieCart = getCookieCart()

    // validando si existe el id en el arreglo de productos
    if ( cookieCart[id] ) {
        cookieCart[id] = cookieCart[id] + 1
    } else {
        cookieCart[id] = 1
    }

    // guardando en las cookies
    setCookie('cart', JSON.stringify( cookieCart ))
}


// eliminando producto
export const removeProductFromCart = ( id: string ) => {
    // obteniendo cookies
    const cookieCart = getCookieCart()
    
    // eliminando producto de las cookies
    delete cookieCart[id]

    // guardando en las cookies
    setCookie('cart', JSON.stringify( cookieCart ))
}



// quitando un artículo del carrito
export const removeSingleItemFromCart = ( id: string) => {
    let cookieCart = getCookieCart()

    if ( !cookieCart[id] ) return 

    // disminuyendo cantidad de productos
    const itemsInCart = cookieCart[id] - 1

    // eliminando producto del carrito al llegar a 0 
    if ( itemsInCart <= 0 ) {
        delete cookieCart[id]
    } else {
        cookieCart[id] = itemsInCart
    }
    
    // guardando en las cookies
    setCookie('cart', JSON.stringify( cookieCart ))
}

// añadiendo un artítulo al carrito
export const addSingleItemFromCart = ( id: string ) => {
    let cookieCart = getCookieCart()

    if ( !cookieCart[id] ) return 

     // disminuyendo cantidad de productos
     const itemsInCart = cookieCart[id] + 1

     cookieCart[id] = itemsInCart
         
     // guardando en las cookies
     setCookie('cart', JSON.stringify( cookieCart ))
}