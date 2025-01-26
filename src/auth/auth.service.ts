import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model <UserDocument>,
 private jwtService:JwtService
){}
async register (dto:AuthDto){
 const hashedPass= await bcrypt.hash(dto.password,10)
    
    const newUser= new this.userModel({
        email:dto.email,
        password:hashedPass
    });
    const user=await newUser.save()
    return this.createToken(user.email)
}

async login(dto: AuthDto) {
    if (!dto || !dto.email || !dto.password) {
      throw new UnauthorizedException("Email ve şifrə daxil edilməlidir.");
    }
  
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) {
      throw new UnauthorizedException("Səhv email.");
    }
  
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Səhv şifrə.");
    }
  
    return this.createToken(user.email);
  }


 createToken(email:string){
    return this.jwtService.sign({email})
 }
}
