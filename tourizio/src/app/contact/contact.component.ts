import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ScrollAnimateDirective } from '../home/scroll-animate.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollAnimateDirective],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  showSuccessMessage = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      phone: ['', [Validators.required, this.phoneValidator]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.showSuccessMessage = true;
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted = false;
        this.showSuccessMessage = false;
      }, 3000);
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}

