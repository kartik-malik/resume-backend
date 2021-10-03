import {
  RequestHandler,
  Request,
  Response,
  NextFunction,
  response,
} from "express";
export interface errorObj {
  status?: number;
  message?: string;
}
const errorHandler = function (
  err: errorObj,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(err.status || 500).json({
    error: {
      message: err.message || "Something went wrong",
    },
  });
};
export default errorHandler;
