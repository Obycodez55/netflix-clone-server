import { sign } from "jsonwebtoken";
import { JWTData } from "../dtos/UserDto";

const secret = process.env.JWT_SECRET as string;
const getAccessToken = (data: JWTData) => {
    const accessToken = sign(data, secret, { expiresIn: "5 days" })
    return accessToken;
}

export default getAccessToken;