import {z} from 'zod';

export const SignupPostRequestBodySchema = z.object({
    firstName:z.string(),
    lastName:z.string().optional(),
    email:z.string().email(),
    password:z.string().min(3)

});

export const LoginPostRequestBodySchema = z.object({
    email:z.string().email(),
    password:z.string().min(3)

})

export const shortenPostRequestBodySchema =  z.object({
    url:z.string().url(),
    code:z.string().optional()
})