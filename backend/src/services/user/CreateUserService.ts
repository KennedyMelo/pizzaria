import prismaClient from '../../prisma'

interface UserRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserService{
  async execute({name, email, password}: UserRequest){

    //check if he sended an email
    if(!email){
      throw new Error("Email incorrect")
    }

    //Check if the email already exists
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(userAlreadyExists){
      throw new Error("User already exists")
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    
    return user;
  }
}

export { CreateUserService }