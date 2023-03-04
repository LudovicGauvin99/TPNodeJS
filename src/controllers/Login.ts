const express = require('express');
import { Request, Response } from "express";
import { User } from "../models/User";
import { JWT_SECRET } from "../config";
const router = express.Router();

import jwt from 'jsonwebtoken';



class Auth{

    currentUser = {} as any

        public login = async  (req: Request, res: Response) => {
        const { lastname, password } = req.body
        this.currentUser = await User.findOne({
            lastname , password
        })
        
        if(this.currentUser){
            const token = jwt.sign({ id: this.currentUser.id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({text: "User connected", token})
        }else{
            res.json({text: "User not found"})
        }
    }
}

const auth = new Auth()


export default auth

router.post("/login" , auth.login);

