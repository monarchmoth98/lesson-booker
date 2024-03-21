import { Controller, Get, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get()
  getSchedule(@Query('date') date: Date) {
    console.log(date);
    if (!date) {
      return this.scheduleService.getThisWeekSchedule();
    }
    return this.scheduleService.getScheduleForDate(date);
  }
}
