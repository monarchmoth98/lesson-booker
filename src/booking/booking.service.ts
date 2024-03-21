import { HttpException, Injectable } from '@nestjs/common';
import { DaySchedule, Lesson } from '@prisma/client';
import { Student } from 'src/models';
import { PrismaService } from 'src/services/prisma.service';

interface BookingRequest {
  startDate: Date;
  endDate: Date;
  Student: Student;
  fee: number;
}

@Injectable()
export class BookingService {
  constructor(private prismaService: PrismaService) {}

  private async getDaySchedule(date: string): Promise<DaySchedule> {
    const daySchedule = await this.prismaService.daySchedule.findUnique({
      where: {
        date: date,
      },
    });

    if (!daySchedule) {
      throw new HttpException({ error: 'Schedule for this Day was not found', date: date }, 404);
    }

    return daySchedule;
  }

  private validateBooking(currentLessons: Lesson[], newBooking: BookingRequest): boolean {
    for (const lesson of currentLessons) {
      if (newBooking.startDate > lesson.endTime || newBooking.endDate < lesson.startTime) {
        continue;
      } else {
        return false;
      }
    }
    return true;
  }

  public async postBookingRequest(bookingRequest: BookingRequest): Lesson {
    const bookingDate: string = new Date(bookingRequest.startDate).toISOString().split('T')[0];

    // find the current schedule for this day
    const daySchedule = await this.getDaySchedule(bookingDate);

    // validate the lesson request. It should not overlap with other lessons.
    if (!this.validateBooking(daySchedule.lessons, bookingRequest)) {
      throw new HttpException('Lesson overlaps with existing lessons', 400);
    }

    // post the lesson request
    this.prismaService.lesson.create({
      data: {
        startTime: bookingRequest.startDate,
        endTime: bookingRequest.endDate,
        student: bookingRequest.Student,
      },
    });
  }
}
