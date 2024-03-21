import { HttpException, Injectable } from '@nestjs/common';
import { WeekSchedule } from '@prisma/client';
import { DateHelper } from 'src/helpers/datehelper';
import { PrismaService } from 'src/services/prisma.service';

const dateHelper = new DateHelper();

@Injectable()
export class ScheduleService {
  constructor(private prismaService: PrismaService) {}

  public async getScheduleById(id: string): Promise<WeekSchedule> {
    const schedule: WeekSchedule | null = await this.prismaService.weekSchedule.findUnique({
      where: {
        id: id,
      },
    });

    if (!schedule) {
      throw new HttpException({ error: 'Schedule for this Week was not found', id: id }, 404);
    }
    return schedule;
  }

  /**
   * Returns the Schedule for this week
   */
  public async getThisWeekSchedule(): Promise<WeekSchedule> {
    const weekStartDate = dateHelper.findWeekStartDate(new Date());

    // check if this week already has a schedule created for it
    const weekSchedule: WeekSchedule | null = await this.prismaService.weekSchedule.findUnique({
      where: {
        startDate: weekStartDate.toISOString().split('T')[0], // yyyy-mm-dd format
      },
    });

    if (!weekSchedule) {
      // create a week schedule
      console.log('create a new Week Schedule');
      return await this.prismaService.weekSchedule.create({
        data: {
          startDate: weekStartDate.toISOString().split('T')[0],
          schedule: {},
        },
      });
    }
    console.log('schedule already exists. Returning existing schedule.');
    return weekSchedule;
  }

  /**
   * Returns the current schedule for the week starting on the given day.
   * @param startDate The date of the Monday in the week that we are pulling information for.
   */
  public async getScheduleForDate(date: Date): Promise<WeekSchedule> {
    const startDate = dateHelper.findWeekStartDate(date);
    const schedule: WeekSchedule | null = await this.prismaService.weekSchedule.findUnique({
      where: {
        startDate: startDate.toISOString().split('T')[0],
      },
    });

    if (!schedule) {
      throw new HttpException({ error: 'Schedule for this Week was not found', date: date, startDate: startDate }, 404);
    }
    return schedule;
  }
}
