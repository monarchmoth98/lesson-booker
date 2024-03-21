import { DaySchedule } from './daySchedule';

export interface WeekSchedule {
  startDate: Date;
  schedule: DaySchedule[];
}
