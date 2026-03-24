import {z} from "zod"

export const validateJWT= z.object({
    id:z.string()
})