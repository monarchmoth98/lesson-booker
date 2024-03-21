import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Get()
  getBookings() {}

  @Get()
  getBookingById() {}

  @Post()
  makeBookingRequest(@Body() body: Bookingrequest) {
    this.bookingService.postBookingRequest(body);
  }

  @Put()
  editBooking() {}

  @Delete()
  deleteBooking() {}
}
