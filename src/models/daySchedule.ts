import { Lesson } from './lesson';

enum Weekday {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

export interface DaySchedule {
  weekday: Weekday;
  date: Date;
  lessons: Lesson[];
}
