import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PoDynamicFormField, PoGaugeRanges, PoListViewAction, PoStepperComponent } from '@po-ui/ng-components';

import { PoMenuItem } from '@po-ui/ng-components';
import { enviroment } from 'src/environments/environments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('stepper') stepper!: PoStepperComponent;

  // o uso da exclamação, faz com que seja inicalizada vazia a variavel
  dynamicForm!: NgForm;
  raw!: any;
  //- recebe o valor da url json
  API = enviroment.API;

  transactionConfirm: any = [];

  propertyData: boolean = false;
  propertyAccept: boolean = false;
  propertyConclued: boolean = false;

  isHideLoading: boolean = true;
  
  poGaugeAll: number = 0;
  poGaugeDay: number = 0;
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.updatePoGauge();
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

  readonly actions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.confirm.bind(this),
      icon: 'po-icon-ok'
    },
    {
      label: 'Cancelar',
      action: this.cancel.bind(this),
      type: 'danger',
      icon: 'po-icon-close'
    }
  ];

  propertyForm: Array<PoDynamicFormField> = [
    {
      property: 'sender',
      label: 'Remetente',
      placeholder: 'Remetente',
      gridColumns: 4,
      required: false
    },
    {
      property: 'recepient',
      label: 'Destinatário',
      placeholder: 'Destinatário',
      gridColumns: 4,
      required: false
    },
    {
      property: 'money',
      label: 'Valor',
      type: 'currency',
      placeholder: 'Valor',
      gridColumns: 4,
      required: false
    },
    {
      property: 'description',
      label: 'Descrição',
      placeholder: 'Descrição do pagamento',
      gridColumns: 12,
      rows: 5,
      required: false
    },
  ];

  turnoverRanges: Array<PoGaugeRanges> = [
    { from: 0, to: 50, label: 'Baixo', color: '#00b28e' },
    { from: 50, to: 75, label: 'Médio', color: '#ea9b3e' },
    { from: 75, to: 100, label: 'Alto', color: '#c64840' }
  ];



  save() {

    if (this.poGaugeDay >= 100) {
      alert('Limite diário atingido')
      return
    } else if (this.poGaugeAll >= 100) {
      alert('Limite total atingido')
      return
    }

    // pega os valore e campos inputados 
    this.transactionConfirm = [];
    this.raw = this.dynamicForm.form.getRawValue();
    this.raw = {
      ...this.raw,
      date: new Date().toISOString()
    }
    this.isHideLoading = false;
    this.http.post(this.API, this.raw).subscribe((response) => {
      this.propertyData = true;
      this.transactionConfirm.push(response);
      this.dynamicForm.reset();
      this.stepper.next();
      this.propertyData = false;
      this.isHideLoading = true;

    })
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  poData() {
    return this.propertyData;
  }

  poAccept() {
    return this.propertyAccept;
  }

  poConcluded() {
    return this.propertyConclued;
  }

  confirm() {
    this.isHideLoading = false;

    this.updatePoGauge();

    this.propertyAccept = true;
    this.stepper.next();
    this.propertyAccept = false;
    this.dynamicForm.reset();
    this.isHideLoading = true;

    //- volta para a primeira página depois de 4 segundos
    setTimeout(() => {
      this.stepper.first();
    }, 4000)
  }

  cancel() {
    this.stepper.first();
  }

  updatePoGauge() {
    this.http.get(this.API).subscribe((items: any) => {
      console.log(items)
      this.poGaugeAll = 1 * items.length;

      const today = new Date().toLocaleDateString();

      let count = 0;

      items.map((response: any) => {
        const dateToCompare = new Date(response.date).toLocaleDateString();

        if (today === dateToCompare) {
          count++
        }
      })

      this.poGaugeDay = count;
    })
  }

}
