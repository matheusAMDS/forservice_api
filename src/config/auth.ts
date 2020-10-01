import { SignOptions } from 'jsonwebtoken'

export const SECRET = process.env.ACCESS_TOKEN_SECRET as string

export const ACCESS_TOKEN_OPTIONS = {
  expiresIn: '1h'
} as SignOptions