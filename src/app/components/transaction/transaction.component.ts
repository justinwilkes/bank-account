import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})

export class TransactionComponent {
  @Input() transaction: ITransaction;
  @Input() filter: 'all' | 'credit' | 'debit';
  openDialog: boolean;

  // Opens the dialog
  toggleDialog(openDialog: boolean) {
    this.openDialog = openDialog;
  }

  // Returns if it must show the item
  get shallShow() {
    if (this.filter === 'all') return true;
    return this.transaction.debit_credit === this.filter;
  }

  get isDebit() {
    return this.transaction.debit_credit === 'debit';
  }

  get isCredit() {
    return this.transaction.debit_credit === 'credit';
  }
}
