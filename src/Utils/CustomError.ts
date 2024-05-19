class CustomError extends Error {
    message: string;
    statusCode: number;
    status: string;
    isoperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.message = message;
        this.statusCode = statusCode
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isoperational = true;

        Error.captureStackTrace(this, this.constructor);

    }
}

export default CustomError;