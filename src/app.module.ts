import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleController } from './schedule/schedule.controller';
import { ScheduleService } from './schedule/schedule.service';
import { PrismaService } from './services/prisma.service';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';

@Module({
  imports: [],
  controllers: [AppController, ScheduleController, BookingController],
  providers: [AppService, ScheduleService, PrismaService, BookingService],
})
export class AppModule {}
