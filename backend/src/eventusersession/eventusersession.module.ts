import { Module } from '@nestjs/common';
import { EventusersessionService } from './eventusersession.service';

@Module({
    providers: [EventusersessionService],
    exports: [EventusersessionService],
})
export class EventusersessionModule { }
