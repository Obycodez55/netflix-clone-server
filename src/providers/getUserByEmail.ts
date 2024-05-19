import prismadb from "../lib/prismadb";

const getUserByEmail = async(email:string)=>{
    const user = await prismadb.user.findUnique({
        where: {
            email
        }
    });
    return user;
}

export default getUserByEmail;