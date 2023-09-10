import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest{
  email: string;
  password: string;
}

class AuthUserService{
  async execute({ email, password}: AuthRequest){
    //check if email already exists
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })
    
    if(!user){
      throw new Error("User/password incorrect")
    }

    // check if the password is correct
    const passwordMatch = await compare(password, user.password)
    
    if(!passwordMatch){
      throw new Error("User/password incorrect")
    }

    // generate JWT e return the user data as id, name and email 

    return {ok: true}
  }
}

export {AuthUserService};