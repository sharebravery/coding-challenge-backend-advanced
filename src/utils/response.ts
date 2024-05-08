import { Response } from "express";

export const successResponse = (res: Response, data: any, statusCode = 200): Response => {
    return res.status(statusCode).json({
        success: true,
        data,
    });
};

export const errorResponse = (res: Response, message: string, statusCode = 500): Response => {
    return res.status(statusCode).json({
        success: false,
        error: {
            message,
        },
    });
};
