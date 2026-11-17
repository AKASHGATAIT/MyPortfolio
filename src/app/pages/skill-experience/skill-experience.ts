import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

interface SkillCategory {
  Title: string;
  Description: string;
  Icon: string;
  SubjectKnown: string[];
}

@Component({
  selector: 'app-skills-experience',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule],
  templateUrl: './skill-experience.html',
  styleUrl: './skill-experience.css'
})

export class SkillExperience {
  SkillList: SkillCategory[] = [
    {
      Title: 'Frontend Development',
      Description: 'Building responsive and interactive user interfaces',
      Icon: 'fa-solid fa-code',
      SubjectKnown: ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Angular', 'React.js', 'Bootstrap',]
    },

    {
      Title: 'Backend Development',
      Description: 'Developing APIs and server-side applications',
      Icon: 'fa-solid fa-server',
      SubjectKnown: ['C#', 'ASP.NET Core', 'Entity Framework Core', 'Node.js', 'Express.js', 'REST API', 'JWT Authentication']
    },

    {
      Title: 'Database Management',
      Description: 'Database design, queries and data management',
      Icon: 'fa-solid fa-database',
      SubjectKnown: ['SQL Server', 'MySQL', 'MongoDB', 'SQL', 'Database Design', 'CRUD Operations', 'Database Normalization']
    },

    {
      Title: 'Tools & Technologies',
      Description: 'Development tools and project management',
      Icon: 'fa-solid fa-screwdriver-wrench',
      SubjectKnown: ['Visual Studio', 'VS Code', 'Git', 'GitHub', 'Postman', 'Swagger', 'SSMS', 'npm']
    },

    {
      Title: 'Programming & Core Skills',
      Description: 'Programming fundamentals and problem solving',
      Icon: 'fa-solid fa-laptop-code',
      SubjectKnown: ['C', 'Java', 'Data Structures', 'Algorithms', 'OOP', 'Problem Solving']
    }
  ];

}
