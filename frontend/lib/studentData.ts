import { Student } from '../contexts/StudentContext';
import studentsData from '../constants/data.json';

// Server-side data fetching utility
export async function getStudentById(studentId: string): Promise<Student | null> {
  // Simulate async operation (in real app, this might be a database call)
  await new Promise(resolve => setTimeout(resolve, 0));
  
  const students = studentsData as Record<string, Student>;
  return students[studentId] || null;
}

export async function getAllStudents(): Promise<Record<string, Student>> {
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 0));
  
  return studentsData as Record<string, Student>;
}
