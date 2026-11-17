import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ContactUs } from './pages/contact-us/contact-us';
import { Projects } from './pages/projects/projects';
import { SkillExperience } from './pages/skill-experience/skill-experience';
import { Education } from './pages/education/education';
import { GenerateCertificate } from './pages/generate-certificate/generate-certificate';
import { PdfGenerator } from './pages/pdf-generator/pdf-generator';
export const routes: Routes = [
    { path: '', component: Home },
    { path: 'contact', component: ContactUs },
    { path: 'projects', component: Projects },
    { path: 'skills-experience', component: SkillExperience },
    { path: 'education', component: Education },
];
