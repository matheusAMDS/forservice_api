import { Request } from "apollo-server-express"

import { Payload } from './auth'

export interface Context {
  req: Request,
  user: Payload
}