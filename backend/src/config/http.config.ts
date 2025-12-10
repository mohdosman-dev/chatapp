export const HTTPSTATUS = {
  OK: 200,
  NOT_FOUND: 400,
  CREATED: 201,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
};

// Represents the possible HTTP status codes used in the application.
export type HttpStatusCodeType = (typeof HTTPSTATUS)[keyof typeof HTTPSTATUS];
