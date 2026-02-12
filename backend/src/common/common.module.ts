import { Module, Global } from '@nestjs/common';
import { HashingService } from './providers/hashing/hashing.service';

@Global()
@Module({
    providers: [HashingService],
    exports: [HashingService],
})
export class CommonModule { }
