import { expressjwt } from 'express-jwt'
import {JWT_SECRET} from '../config'

export const jwt = () => {
    const secret = JWT_SECRET
    if (!secret) {
        throw new Error('JWT secret is not defined')
    }

    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/auth/login',
            '/auth/register'
        ]
    })
}