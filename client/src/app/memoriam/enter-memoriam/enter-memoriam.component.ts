import { Component, inject } from '@angular/core';
import { AppImageUploadComponent } from '../../app-image-upload/app-image-upload.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoticeEntryModel } from '../../notice-entry/notice-entry.model';
import { ToastUtils } from '../../shared/utils/toastUtils';
import { EnterMemoriamService } from './enter-memoriam.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { persistStateToLocalStorage } from '../../shared/utils/localStorageUtils';

@Component({
  selector: 'app-enter-memoriam',
  standalone: true,
  imports: [
    AppImageUploadComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './enter-memoriam.component.html',
  styleUrl: './enter-memoriam.component.scss'
})
export class EnterMemoriamComponent {
  public memoriamEntryModel = inject(NoticeEntryModel);
  private enterMemoriamService = inject(EnterMemoriamService);
  private toastrUtils = inject(ToastUtils);
  public memoriamPrice: number = environment.memoriam_amount;

  stripe: Stripe | null = null;
  cardElement: any;
  card: any;
  elements: any;
  clientSecret: string = "";

  public isSubmitting = false;

  ngOnInit() {
    // this.setUpStripe();
  }

  public setUpStripe = async () => {
    this.stripe = await loadStripe(environment.pk_test);

    console.log('Stripe loaded:', this.stripe);

    if (this.stripe) {
      this.elements = this.stripe.elements();

      this.card = this.elements.create('card', {
        hidePostalCode: true
      });
      this.card.mount('#card-element');

    }

    // this.enterMemoriamService.createPaymentIntent({ amount: environment.memoriam_amount, currency: 'usd' }).subscribe((paymentIntent => {
    //   for (const [key, value] of Object.entries(paymentIntent)) {
    //     if (key === 'client_secret') {
    //       console.log(`${key}: ${value}`);
    //       this.clientSecret = value as string;
    //       console.log('clientSecret', this.clientSecret);
    //     } else {
    //       // this.toastrUtils.show(
    //       //   'error',
    //       //   'There may be a problem with your credit card.',
    //       //   'Error Establishing Payment Intent'
    //       // );
    //     }

    //   }
    // }))
  }


  public submitMemoriam = async () => {
    // if (!this.stripe || !this.clientSecret) {
    //   this.toastrUtils.show(
    //     'error',
    //     'There may be a problem with your credit card.',
    //     'Error Processing Payment'
    //   );
    //   return;
    // }

    // const result = await this.stripe.confirmCardPayment(this.clientSecret, {
    //   payment_method: {
    //     card: this.card,
    //   },
    // });

    // if (result.error) {
    //   this.toastrUtils.show(
    //     'error',
    //     result.error.message,
    //     'Error Processing Payment'
    //   );

    //   console.error(result.error.message);
    // } else if (result.paymentIntent?.status === 'succeeded') {
    //   console.log('Payment intent succeeded!');
    //   this.completeMemoriamSubmission();
    // }

    this.completeMemoriamSubmission();  // Temporarily bypass payment for testing
  }

  private completeMemoriamSubmission = () => {
    console.log('submitMemoriam.MemoriamEntryModel:', this.memoriamEntryModel);

    this.isSubmitting = true;
    this.enterMemoriamService.submitMemoriam(this.memoriamEntryModel).subscribe({
      next: (response) => {
        console.log('Memoriam submitted successfully:', response);
        this.toastrUtils.show(
          'success',
          'Memoriam submitted successfully.',
          'Memoriam Success'
        );
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error submitting memoriam:', error);
        this.toastrUtils.show(
          'error',
          error.message || 'An error occurred while submitting the memoriam.',
          'Memoriam Error'
        );
        this.isSubmitting = false;
      }
    })
  }

  public saveMemoriamData = () => {
    console.log('saveMemoriamData.memoriamEntryModel:', this.memoriamEntryModel);
    persistStateToLocalStorage({ memoriamEntryModel: this.memoriamEntryModel });
  }
}
