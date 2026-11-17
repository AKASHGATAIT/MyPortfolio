import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {

  educationList = [
    {
      degree: 'Bachelor of Technology (B.Tech)',
      stream: 'Electronics and Communication Engineering (ECE)',
      institution: 'Narula Institute of Technology (MAKAUT)',
      location: 'Kolkata, West Bengal',
      duration: 'August 2022 - June 2026',
      score: '7.55 CGPA',
      status: 'Completed',
      icon: '🎓',
      description:
        'Studied electronics, communication systems, programming, embedded systems and software engineering.',
      subjects: ['Data Structures & Algorithms', 'Object Oriented Programming', 'Java', 'Digital Electronics',
        'Microprocessors', 'Database Management', 'Computer Networks', 'Signal and System']
    },
    {
      degree: 'Higher Secondary (12th)',
      stream: 'Science',
      institution: 'Gomakpota Gunadhar Vidyamandir High School',
      location: 'West Bengal, India',
      duration: '2020 - 2022',
      score: '87 Percent',
      status: 'Completed',
      icon: '📚',
      description: 'Completed higher secondary education with a focus on science and mathematics.',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Bengali', 'Biology']
    },
    {
      degree: 'Secondary Education (10th)',
      stream: 'General Education',
      institution: 'Gomakpota Gunadhar Vidyamandir High School',
      location: 'Gomakpota, Narayanchak, Paschim Medinipur, West Bengal, India - 721154',
      duration: '2019 - 2020',
      score: '68 Percentage',
      status: 'Completed',
      icon: '🏫',
      description: 'Built a strong foundation in mathematics, science and general education.',
      subjects: ['Bengali', 'English', 'Mathematics', 'Physical Science', 'Biology', 'Geography', 'History']
    }
  ];

  // B.Tech Semester Results
  semesterResults = [
    { semester: '1st Semester', sgpa: '7.50', result: 'Pass' },
    { semester: '2nd Semester', sgpa: '7.20', result: 'Pass' },
    { semester: '3rd Semester', sgpa: '7.65', result: 'Pass' },
    { semester: '4th Semester', sgpa: '7.40', result: 'Pass' },
    { semester: '5th Semester', sgpa: '7.80', result: 'Pass' },
    { semester: '6th Semester', sgpa: '7.60', result: 'Pass' },
    { semester: '7th Semester', sgpa: '7.50', result: 'Pass' },
    { semester: '8th Semester', sgpa: '7.55', result: 'Pass' }
  ];

  // Higher Secondary (12th) Results
  higherSecondaryResults = [
    { subject: 'Bengali', fullMarks: 100, obtained: 85, grade: 'A' },
    { subject: 'English', fullMarks: 100, obtained: 82, grade: 'A' },
    { subject: 'Physics', fullMarks: 100, obtained: 88, grade: 'A' },
    { subject: 'Chemistry', fullMarks: 100, obtained: 86, grade: 'A' },
    { subject: 'Mathematics', fullMarks: 100, obtained: 90, grade: 'A+' },
    { subject: 'Biology', fullMarks: 100, obtained: 91, grade: 'A+' }
  ];

  // Secondary (10th) Results
  secondaryResults = [
    { subject: 'Bengali', fullMarks: 100, obtained: 70, grade: 'B' },
    { subject: 'English', fullMarks: 100, obtained: 72, grade: 'B' },
    { subject: 'Mathematics', fullMarks: 100, obtained: 65, grade: 'B' },
    { subject: 'Physical Science', fullMarks: 100, obtained: 68, grade: 'B' },
    { subject: 'Biology', fullMarks: 100, obtained: 70, grade: 'B' },
    { subject: 'Geography', fullMarks: 100, obtained: 67, grade: 'B' },
    { subject: 'History', fullMarks: 100, obtained: 64, grade: 'B' }
  ];

}
