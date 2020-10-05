import jwt from 'jsonwebtoken'
import { Request } from 'express'
import { AuthChecker } from 'type-graphql'

import { ACCESS_TOKEN_OPTIONS, SECRET } from '../../config/auth'
import { Context } from './context'

export interface Payload {
  id: string
}

export function generateAccessToken(payload: Payload): string {
  return jwt.sign(payload, SECRET, ACCESS_TOKEN_OPTIONS)
}

export function authenticate(req: Request) {
  const auth = req.headers.authorization

  if (!auth)
    return null

  const [ schema, token ] = auth.split(' ')

  return jwt.verify(token, SECRET)
}

export const authChecker: AuthChecker<Context> = ({ context }, _) => {
  return !!context.user
}