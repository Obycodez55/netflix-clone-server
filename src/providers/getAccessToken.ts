import { sign } from "jsonwebtoken";

const getAccessToken = (data: {email: string}) => {
    const accessToken = sign(data, process.env.JWT_SECRET!, { expiresIn: "5 days" })
    return accessToken;
}

export default getAccessToken;