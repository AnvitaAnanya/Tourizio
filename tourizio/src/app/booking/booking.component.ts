import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf, NgFor } from '@angular/common';
import { ScrollAnimateDirective } from '../home/scroll-animate.directive';

// jsPDF will be loaded dynamically if available

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    NgIf,
    NgFor,
    ScrollAnimateDirective
  ]
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup;

  destinations = [
    { id: 'agra', name: 'Agra' },
    { id: 'jaipur', name: 'Jaipur' },
    { id: 'goa', name: 'Goa' },
    { id: 'ladakh', name: 'Ladakh' },
    { id: 'kerala', name: 'Kerala' },
    { id: 'varanasi', name: 'Varanasi' },
    { id: 'rishikesh', name: 'Rishikesh' },
    { id: 'rann of kutch', name: 'Rann of Kutch' },
    { id: 'darjeeling', name: 'Darjeeling' },
    { id: 'udaipur', name: 'Udaipur' },
    { id: 'andaman islands', name: 'Andaman Islands' }
  ];

  minDate: Date;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Set minimum date to today
    this.minDate = new Date();
    this.minDate.setHours(0, 0, 0, 0);

    this.bookingForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', [Validators.required, this.futureDateValidator]],
      endDate: ['', [Validators.required, this.futureDateValidator]],
      people: [1, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      phone: ['', [Validators.required, this.phoneValidator]],
      name: ['', Validators.required],
      address: ['', Validators.required],
      specialRequests: ['']
    });
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(control.value) ? null : { invalidPhone: true };
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    return selectedDate >= today ? null : { pastDate: true };
  }

  ngOnInit() {
    // Scroll to top when component loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    this.route.queryParams.subscribe(params => {
      if (params['destination']) {
        const destinationId = params['destination'].toLowerCase();
        const destination = this.destinations.find(d => d.id === destinationId);
        if (destination) {
          this.bookingForm.patchValue({ destination: destination.id });
        }
      }
    });
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      // Generate and download PDF ticket
      this.downloadTicket();

      // Show confirmation snackbar (notification)
      this.snackBar.open('Booking Confirmed! Ticket downloaded.', 'Close', {
        duration: 3000,
        panelClass: 'booking-snackbar'
      });

      // Reset form after a delay
      setTimeout(() => {
        this.bookingForm.reset({ people: 1 });
        Object.keys(this.bookingForm.controls).forEach(key => {
          const control = this.bookingForm.get(key);
          control?.setErrors(null);
          control?.markAsPristine();
          control?.markAsUntouched();
        });
      }, 1000);

    } else {
      this.bookingForm.markAllAsTouched();
    }
  }

  downloadTicket() {
    const formData = this.bookingForm.value;
    const destination = this.destinations.find(d => d.id === formData.destination);
    const destinationName = destination ? destination.name : formData.destination;
    const startDate = formData.startDate ? new Date(formData.startDate).toLocaleDateString() : 'N/A';
    const endDate = formData.endDate ? new Date(formData.endDate).toLocaleDateString() : 'N/A';
    const bookingRef = 'TOU-' + Date.now();
    
    // Create HTML content for PDF printing
    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Tourizio Booking Confirmation</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
            body {
              font-family: 'Poppins', sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              background: linear-gradient(135deg, #f5f7ff 0%, #ffffff 100%);
              position: relative;
              color: #334155;
            }
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: 120px;
              color: rgba(58, 134, 255, 0.08);
              white-space: nowrap;
              pointer-events: none;
              z-index: 0;
              font-weight: 700;
            }
            .content {
              position: relative;
              z-index: 1;
              background: rgba(255, 255, 255, 0.9);
              padding: 40px;
              border-radius: 20px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(8px);
            }
            h1 {
              color: #3a86ff;
              border-bottom: 3px solid #3a86ff;
              padding-bottom: 15px;
              margin-bottom: 30px;
              font-weight: 700;
              font-size: 28px;
              text-align: center;
            }
            h2 {
              color: #334c8c;
              margin-top: 30px;
              font-size: 22px;
              font-weight: 600;
              border-left: 4px solid #3a86ff;
              padding-left: 15px;
            }
            .section {
              margin: 25px 0;
              padding: 20px;
              background: rgba(255, 255, 255, 0.8);
              border-radius: 12px;
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            }
            .info {
              margin: 12px 0;
              padding: 8px 0;
              border-bottom: 1px solid rgba(0, 0, 0, 0.06);
              display: flex;
              justify-content: space-between;
            }
            .info strong {
              color: #3a86ff;
              font-weight: 600;
              min-width: 140px;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              color: #666;
              background: linear-gradient(135deg, #3a86ff 0%, #334c8c 100%);
              padding: 20px;
              border-radius: 12px;
              color: white;
            }
            .ref-number {
              font-family: monospace;
              background: #f1f5ff;
              padding: 5px 10px;
              border-radius: 4px;
              color: #3a86ff;
              font-weight: 600;
            }
            @media print {
              body {
                padding: 20px;
                background: white;
              }
              .content {
                box-shadow: none;
                border: 1px solid #eee;
              }
            }
          </style>
        </head>
        <body>
          <div class="watermark">CONFIRMED</div>
          <div class="content">
            <h1>TOURIZIO BOOKING CONFIRMATION</h1>
            
            <h2>Booking Details</h2>
            <div class="section">
              <div class="info"><strong>Name:</strong> ${formData.name}</div>
              <div class="info"><strong>Email:</strong> ${formData.email}</div>
              <div class="info"><strong>Phone:</strong> ${formData.phone}</div>
              <div class="info"><strong>Address:</strong> ${formData.address}</div>
            </div>
            
            <h2>Tour Details</h2>
            <div class="section">
              <div class="info"><strong>Destination:</strong> ${destinationName}</div>
              <div class="info"><strong>Check-in Date:</strong> ${startDate}</div>
              <div class="info"><strong>Check-out Date:</strong> ${endDate}</div>
              <div class="info"><strong>Number of People:</strong> ${formData.people}</div>
              ${formData.specialRequests ? `<div class="info"><strong>Special Requests:</strong> ${formData.specialRequests}</div>` : ''}
            </div>
            
            <div class="section">
              <div class="info"><strong>Booking Reference:</strong> <span class="ref-number">${bookingRef}</span></div>
              <div class="info"><strong>Booking Date:</strong> ${new Date().toLocaleDateString()}</div>
            </div>
            
            <div class="footer">
              <h3 style="margin-bottom: 10px;">Thank you for choosing Tourizio!</h3>
              <p style="margin: 0;">Have a safe and enjoyable journey!</p>
            </div>
          </div>
        </body>
        </html>
      `;
    
    // Open in new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      // Auto-trigger print dialog
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  }
}
