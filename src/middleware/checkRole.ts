import { NextFunction, Request, Response } from "express"
import Auth from "../controllers/Login"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

export const isAdmin = (res: Response,next: NextFunction) =>{
    const result =Auth.currentUser?.role === 'Admin'
    if(result){
        next()
    }
    else{
        res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }
}


export const isArtist = (res: Response,next: NextFunction) =>{
    const result =Auth.currentUser?.role === 'Artist'
    if(result)
        next()
    else{
        res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }
}


export const isManger = (res: Response,next: NextFunction) =>{
    const result =Auth.currentUser?.role === 'Manager'
    if(result)
        next()
    else{
        res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED)
    }
}
