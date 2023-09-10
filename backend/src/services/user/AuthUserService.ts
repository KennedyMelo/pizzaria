import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

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
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token
    }
  }
}

export {AuthUserService};