import CategoryResolver from "./CategoryResolver"
import ServiceResolver from "./ServiceResolver"
import SessionResolver from "./SessionResolver"
import UserResolver from "./UserResolver"

export default [
  SessionResolver,
  UserResolver,
  ServiceResolver,
  CategoryResolver
] as const