import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashingService {
    async hash(data: string | Buffer): Promise<string> {
        return argon2.hash(data);
    }

    async compare(data: string | Buffer, encrypted: string | Buffer): Promise<boolean> {
        let encryptedString = encrypted;
        if (Buffer.isBuffer(encrypted)) {
            encryptedString = encrypted.toString('utf-8');
        }
        return argon2.verify(encryptedString as string, data);
    }
}
