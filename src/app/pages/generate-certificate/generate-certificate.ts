import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
@Component({
  selector: 'app-generate-certificate',
  imports: [
    MatCardModule,
    MatIconModule,
    MatStepperModule
  ],
  templateUrl: './generate-certificate.html',
  styleUrl: './generate-certificate.css',
})
export class GenerateCertificate {
  
}
