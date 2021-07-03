import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface FlagsObj {
  displayForm: boolean;
  formSubmit: boolean;
  isValidForm: boolean;
}
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  flags = {} as FlagsObj;

  quoteForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getFlagsStatus();
    this.generateCreateQuoteForm();
  }

  getFlagsStatus() {
    this.flags.displayForm = false;
    this.flags.formSubmit = false;
    this.flags.isValidForm = false;
  }

  generateCreateQuoteForm() {
    this.quoteForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      mobile: [null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: [null, [Validators.required, Validators.email]]
    });

    this.flags.displayForm = true;
  }

  onSubmitForm(quoteForm) {
    console.log("quoteForm", quoteForm);
    this.flags.isValidForm = false;
    this.flags.formSubmit = true;
    if (quoteForm.valid) {
      this.flags.isValidForm = true;
    }
  }
}
