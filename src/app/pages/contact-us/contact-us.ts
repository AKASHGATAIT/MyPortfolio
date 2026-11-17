
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {

  private fb = inject(FormBuilder);

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(5)]],
    message: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(1000)
    ]]
  });

  isSubmitted = false;
  isSending = false;

  // EmailJS Configuration
  private serviceID = 'service_ysb71si';
  private templateID = 'template_0jhm6o5';
  private publicKey = 'XKKvCcoIrWpBpNRmS';

  async onSubmit(): Promise<void> {

    this.isSubmitted = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    if (this.isSending) {
      return;
    }

    this.isSending = true;

    const formData = this.contactForm.getRawValue();

    const templateParams = {
      from_name: formData.name,
      reply_to: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    try {

      await emailjs.send(
        this.serviceID,
        this.templateID,
        templateParams,
        {
          publicKey: this.publicKey
        }
      );

      alert('Your message has been sent successfully!');

      this.contactForm.reset();
      this.isSubmitted = false;

    } catch (error) {

      console.error('Email sending failed:', error);

      alert('Sorry! Something went wrong. Please try again.');

    } finally {

      this.isSending = false;

    }
  }

  get f() {
    return this.contactForm.controls;
  }

}
