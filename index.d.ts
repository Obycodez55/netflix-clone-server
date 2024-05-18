import * as express from "express-serve-static-core"
import { Request } from 'express-serve-static-core';

declare global{
    namespace Express{
        interface Request{
            customField?: string;
        }
    }
}