import { Inject, Service } from 'typedi';
import { IUserInput, IUserService, UserSigninDto, UserSignupDto } from '../types/user';


import { Logger } from 'winston';
import httpStatus from 'http-status-codes';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';
import { config } from '../config';
import jwt from 'jsonwebtoken';
import { AppEvents } from '../subcribers/event';
import { Repository } from 'typeorm';
import { User } from 'src/entity/user';

@Service()
export class UserService implements IUserService {
  constructor(

    @Inject('userDataSource') private userRepository: Repository<User>,
    @Inject('logger') private logger: Logger,
    @EventDispatcher()
    private eventDispatcher: EventDispatcherInterface,
  ) {

  }
  public async getUser(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneBy({id:id});
      return user;
    } catch (error) {
      throw createError(httpStatus.NOT_FOUND, `User ${id} doesn't exist`);
    }
  }
  public async loginUser(userInput: UserSigninDto): Promise<any> {
    let userCheck = await this.userRepository.findOneBy({ username: userInput.username });
    this.logger.info(`loginUser: ${userInput.username}`);
   
    if (!userCheck) {

      throw createError(httpStatus.FORBIDDEN, `Invalid credentials`);
    }
    this.logger.info(`loginUser: ${userCheck.username}`);
    const isMatch = await bcrypt.compare(
      userInput.password,
      userCheck.passwordHash
    );

    this.logger.debug(`isMatch: ${isMatch}`);
    if (!isMatch) {
      this.logger.debug('loginUser: failed to verify password');
      throw createError(httpStatus.FORBIDDEN, `Invalid  credentials`);
    }
    const payload = {
      user: {
        id: userCheck.id,
      }
    };
    const jwtSecret = config.jwtSecret;
    try {
      const token = jwt.sign(payload, jwtSecret, { expiresIn: "24h" });
      this.eventDispatcher.dispatch(AppEvents.user.signIn, userCheck);
      return token;
    } catch (error) {
      throw createError(
        httpStatus.FORBIDDEN,
        `loginUser: Error jsonwebtoken`,
      );
    }
  } catch(error) {
    this.logger.error(`Error loginUser: ${error}`);
    throw error;
  }


  /* Register user */
  public async registerUser(userInput: UserSignupDto) {
    const { username, email, password } = userInput;
    try {
      let user = await this.userRepository.findOneBy({ username: username });

      if (user) {
        throw createError(
          httpStatus.CONFLICT,
          `A user with username ${username} already exists`,
        );
      }
      user = await this.userRepository.findOneBy({ email: email });
      if (user) {
        throw createError(
          httpStatus.CONFLICT,
          `A user with email ${email} already exists`,
        );
      }
      // Encrypting password
      const salt = await bcrypt.genSalt(10);
      userInput.passwordHash = await bcrypt.hash(password, salt);

      const userRecord = await this.userRepository.save(
        userInput
      );
      console.log(userRecord.id);
      // Return password
      const payload = {
        user: {
          id: userRecord.id,
        },
      };
      const jwtSecret = config.jwtSecret;
      try {
        const token = jwt.sign(payload, jwtSecret, { expiresIn: '2h' });

        this.eventDispatcher.dispatch(AppEvents.user.signUp, userRecord);
        await this.userRepository.save({
          id: userRecord.id,
          authKey: token,
        });
        this.logger.info('Success registerUser');
        return token;
      } catch (error) {
        this.logger.error(`Error registerUser: ${error}`);
        throw createError(
          httpStatus.FORBIDDEN,
          `RegisterUser: Error jsonwebtoken`,
        );
      }
    } catch (error) {
      this.logger.error(`Error registerUser: ${error}`);
      throw error;
    }
  }
}