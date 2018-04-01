import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { notAllCaps } from '../_validators/not-all-caps.validator';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  @Output() closeFeedbackForm = new EventEmitter();

  public feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      telephone: ['', Validators.pattern('[0-9]{11}')],
      message: ['', Validators.compose([Validators.required, notAllCaps()])]
    });
  }

  hideFeedbackForm() {
    this.closeFeedbackForm.emit();
  }

  @HostListener('document:keyup', ['$event']) onkeyup(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hideFeedbackForm();
    }
  }

}
