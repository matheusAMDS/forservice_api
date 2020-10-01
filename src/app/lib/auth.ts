import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_OPTIONS, SECRET } from '../../config/auth'

interface Payload {
  id: string
}

export function generateAccessToken(payload: Payload): string {
  return jwt.sign(payload, SECRET, ACCESS_TOKEN_OPTIONS)
}