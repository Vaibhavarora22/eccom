import bcrypt from 'bcrypt';

//for generating hash password
export const  hashPassword = async(password) => {
    try{
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password , saltRounds);
        return hashedpassword;
    }
    catch (error) {
        console.log(error);
    }
}

//for checking hash password == password from user
export const comparePassword = async (password , hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);
}