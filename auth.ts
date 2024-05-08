import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

//? Adaptador
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "@/auth/actions/auth-actions";


const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Correo Electrónico", type: "email", placeholder: "usuario@gmail.com" },
        password: { label: "Contraseña", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {

        // ! - valores que siempre deben ir 
        const user = await signInEmailPassword( credentials!.email, credentials!.password )
  
        if (user) return user
        
        // si no existe el usuario
        return null
      }
    })
  ],

  // se ejecutan de manera secuencial, haciendo dependiente el siguiente del primero en su resultado
  session: {
    strategy: 'jwt'
  },
  // funciones que se ejecutan durante el ciclo de vida de la autenticación del usuario
  callbacks: {  
    async signIn({ user, account, profile, email, credentials }) {
      // false - acceso denagado
      return true
    },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' }})

      //validar si se encuentra activo
      if ( dbUser?.isActive === false ){
        throw Error('Usuario no está activo')
  
      }
    
      // agregando información adicional
      token.roles = dbUser?.roles ?? ['no-roles']
      token.id = dbUser?.id ?? 'no-uuid'
      
      return token 
    },  

    async session({ session, token, user }) {

      // asignando las propiedades del usuario a la sesión
      if ( session && session.user ) {
        session.user.roles = token.roles
        session.user.id = token.id
      }

      return session
    }
  }
})


