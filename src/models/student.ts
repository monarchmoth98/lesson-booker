import { Lesson } from './lesson';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pfp: string;
  lessonCredits: number;
  lessons: Lesson[];
}
