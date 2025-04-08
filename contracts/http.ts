declare module '@adonisjs/core/http' {
    interface Request {
      authUser?: {
        id: number
        email: string
        fullName: string
      }
    }
  }