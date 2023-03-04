import joi, { string } from 'joi'
import mongoose from 'mongoose'

export const CreateModelSchema = joi.object({
    name: joi.string().required(),
    artistFullname: joi.string().required(),
    valid: joi.boolean().optional(),
    approval: joi.number().optional(),
    disapproval: joi.number().optional()
}).required()

export const UpdateModelSchema = joi.object({
    name: joi.string().required(),
    artistFullname: joi.string().required(),
    valid: joi.boolean().required(),
    approval: joi.number().required(),
    disapproval: joi.number().required()
}).required()


const modelSchema = new mongoose.Schema({
    id: Number,
    name: String,
    artistFullname: String,
    valid: Boolean,
    approvals: [{
        manager: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        approved: {type: Boolean, required: true},
        comment: {type: string}
    }]
})

export const Model = mongoose.model('Model', modelSchema)