export interface UserDto{
    username: string,
    email: string,
    password: string
}

export interface JWTData{
    email: string,
    isAdmin: boolean,
    emailVerified: boolean
}