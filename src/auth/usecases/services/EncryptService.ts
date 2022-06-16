import * as bcrypt from 'bcryptjs';
import {Injectable} from '@nestjs/common';

@Injectable()
export class EncryptService {
    hashPassword(password: string): string {
        return bcrypt.hashSync(password, 5);
    }

    comparePasswords(password: string, passwordHash: string): boolean {
        return bcrypt.compareSync(password, passwordHash);
    }
}
