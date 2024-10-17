
import exp from 'constants';
import { Request, Response, NextFunction } from 'express';

function globalErrorHandler(err, req: Request, res: Response, next: NextFunction) {
    const statusCode = err.statusCode || 500;
    const status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    if(process.env.NODE_ENV === 'development') {
        res.status(statusCode).json({
            status: status,
            message: err.message,
            stack: err.stack ,
        });
    }else if(process.env.NODE_ENV === 'production') {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
          
            res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!',
            });
        }
    }

  
}

const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export default {globalErrorHandler, catchAsync};