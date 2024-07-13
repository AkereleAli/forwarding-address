import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { plainToInstance } from 'class-transformer';
import { RegisterUserResponseDto } from './response/register-user.dto';
import { UserDetailsResponseDto } from './response/user-details.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}
  async registerUser(createUserDto: CreateUserDto): Promise<string> {
    const checkIfuserExists = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (checkIfuserExists) {
      throw new ConflictException('user already exists');
    }
    const user = this.userRepo.create(createUserDto);
    await this.userRepo.save(user);
    // const { password, id, user_id, createdAt, updatedAt, ...result } = user;
    // return plainToInstance(RegisterUserResponseDto, user);
    return `user successfully registered`;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email });
  }

  async findById(user_id: string): Promise<any> {
    const user = this.userRepo.findOneBy({ user_id });
    return plainToInstance(UserDetailsResponseDto, user);
  }

  async findUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async update(user_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOneBy({ user_id });
    Object.assign(user, updateUserDto);
    return await this.userRepo.save(user);
  }

  async patchUser(email: string, user: Partial<User>): Promise<void> {
    await this.userRepo.update(email, user);
  }
}
