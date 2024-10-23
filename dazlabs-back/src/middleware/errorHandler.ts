import { Response, Request, NextFunction } from "express"

interface CustomError extends Error {
    status?: number;
  }

const errorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500).json(error)
    next()
}

export default errorHandler