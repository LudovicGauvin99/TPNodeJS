import { type User } from '../models/User'
import {JWT_SECRET} from '../config'
import jwt from 'jsonwebtoken'

export const generateToken = (user: typeof User) => {
    const secret = JWT_SECRET
    if (!secret) {
        throw new Error('JWT secret is not defined')
    }

    const token = jwt.sign({ sub: user }, secret, {
        expiresIn: '7d'
    })

    return {
        ...user,
        token
    }
}
