import joi from 'joi'
import mongoose from 'mongoose'

export const CreateUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    role: joi.string().required(),
    IsBanned: joi.boolean().default(false)
}).required()

export const UpdateUserSchema = joi.object({
    name: joi.string().optional(),
    email: joi.string().email().optional(),
    password: joi.string().optional(),
    IsBanned: joi.boolean().optional()
}).required()

export const removePassword = (user: any) => {
    const { password, ...userWithoutPassword } = user

    return userWithoutPassword
}

const userSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String
    },
    email: String,
    password: {
        type: Object
    },
    role: String,
    IsBanned: Boolean,
    created_at: Date,
    updated_at: Date
})

export const User = mongoose.model('User', userSchema)
