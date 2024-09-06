import { z } from 'zod'

export const isPhone = (str: string) => /^1[3-9]\d{9}$/.test(str)

export const isEmail = (str: string) => z.string().email().safeParse(str).success
