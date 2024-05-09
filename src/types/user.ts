import { IsNotEmpty, IsEmail, MaxLength, IsString, IsOptional } from "class-validator";
import { User } from "src/entity/user";


export interface IUserService {
    getUser: (id: number) => Promise<User>;
    loginUser: (userInput: UserSigninDto) => Promise<any>;
    registerUser: (userInput: UserSignupDto) => Promise<any>;
}

export interface RequestUser extends Request {
    user?: IUserInput;
}
export interface IUserInput {
    id?: string;
    username?: string;
    email?: string;
    password: string;
}
export class UserSigninDto {
    @IsString()
    username: string;
    @IsString()
    password: string;
}

export class UserSignupDto {
    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    lastName: string;

    authKey:string;

    @IsNotEmpty()
    @MaxLength(255)
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsOptional()
    passwordHash?: string;

    @IsNotEmpty()
    @MaxLength(255)
    @IsEmail()
    email: string;

    @IsOptional()
    @MaxLength(255)
    ipAddress: string | null;

    @IsNotEmpty()
    status: number;

    @IsNotEmpty()
    @MaxLength(20)
    role: string;
}

