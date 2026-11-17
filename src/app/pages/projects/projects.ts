import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  selectedCategory = 'All';
  categories = ['All', 'Full Stack', 'AI / ML', 'Embedded Systems', 'Java / DSA', 'Cybersecurity'];
  projectsList = [
    {
      id: 1,
      title: 'E-Commerce Web Application',
      category: 'Full Stack',
      subtitle: 'Full Stack Development',
      duration: 'January 2025 - August 2025',
      icon: 'fa-solid fa-cart-shopping',
      color: 'blue',
      description: 'Developed a full-stack E-Commerce application with separate user and admin dashboards. Users can browse products, manage shopping carts, place orders and make secure online payments.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Razorpay'],
      github: 'https://github.com/yourusername/ecommerce',
      demo: ''
    },

    {
      id: 2,
      title: 'AI-Powered Brain Tumor Detection',
      category: 'AI / ML',
      subtitle: 'Artificial Intelligence & Computer Vision',
      duration: 'September 2025 - December 2025',
      icon: 'fa-solid fa-brain',
      color: 'purple',
      description: 'Developed a brain tumor detection system using YOLOv10 to identify tumors from MRI images. Trained the model using 2,000 annotated MRI images with transfer learning.',
      technologies: ['Python', 'YOLOv10', 'Roboflow', 'Gradio', 'Machine Learning', 'Computer Vision'],
      github: 'https://github.com/yourusername/brain-tumor-detection',
      demo: ''
    },

    {
      id: 3,
      title: 'Smart Stick for Visually Impaired',
      category: 'Embedded Systems',
      subtitle: 'IoT & Embedded Systems',
      duration: 'July 2024',
      icon: 'fa-solid fa-person-walking-with-cane',
      color: 'green',
      description: 'Designed a smart assistive walking stick using ESP32 and ultrasonic sensors to detect obstacles. ESP32-CAM supports image capture and object recognition with audio alerts for users.',
      technologies: ['ESP32', 'ESP32-CAM', 'Embedded C', 'Ultrasonic Sensor', 'Servo Motor', 'Gemini API'],
      github: 'https://github.com/yourusername/smart-stick',
      demo: ''
    },

    {
      id: 4,
      title: 'Sorting Algorithm Visualization',
      category: 'Java / DSA',
      subtitle: 'Java & Data Structures',
      duration: 'June 2025 - July 2025',
      icon: 'fa-solid fa-chart-column',
      color: 'orange',
      description: 'Created an interactive sorting visualization platform that demonstrates how sorting algorithms work step by step. Users can generate random arrays and select different sorting algorithms.',
      technologies: ['Java', 'DSA', 'Algorithms', 'OOP'],
      github: 'https://github.com/yourusername/sorting-visualization',
      demo: ''
    },

    {
      id: 5,
      title: 'Breach Guardian',
      category: 'Cybersecurity',
      subtitle: 'Email Data Breach Detection',
      duration: 'Project Development',
      icon: 'fa-solid fa-shield-halved',
      color: 'cyan',
      description: 'Developed an email data breach detection system that checks whether an email address has appeared in known data breaches through an external breach-checking API.',
      technologies: ['React.js', 'TypeScript', 'Node.js', 'JavaScript', 'HTML5', 'CSS3', 'REST API'],
      github: 'https://github.com/yourusername/breach-guardian',
      demo: ''
    }
  ];

  get filteredProjects() {
    if (this.selectedCategory === 'All') {
      return this.projectsList;
    }

    return this.projectsList.filter(
      project => project.category === this.selectedCategory
    );
  }

  filterProjects(category: string): void {
    this.selectedCategory = category;
  }
}