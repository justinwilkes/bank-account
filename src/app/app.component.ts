import { Component, OnInit } from '@angular/core';
import { BankAccountService } from './services/bank-account.service';
import * as moment from '../../node_modules/moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  bankAccounts: IBankAccount[];
  appliedFilter = 'all';
  totalItems = 0;
  totalCredit = 0;
  totalDebit = 0;
  totalExpenses = 0;
  totalReceveievs = 0;

  constructor(private bankAccountService: BankAccountService) { }

  ngOnInit() {
    // Retrieve the bankAccounts
    this.bankAccountService.getBankAccounts().then((bankAccounts) => {
      this.bankAccounts = bankAccounts;

      this.calculateTotalItems();
      this.calculateTotalAmounts();
    });
  }

  // Applies a filter on al the transactions
  applyFilter(filter: 'all' | 'credit' | 'debit') {
    document.querySelector('.mnx-chip--active.transition-filter-chip').classList.remove('mnx-chip--active');
    document.querySelector(`.transition-filter-chip.${filter}`).classList.add('mnx-chip--active');

    this.appliedFilter = filter;
  }

  // Calculates all the items, the credit and debit items
  calculateTotalItems() {
    this.bankAccounts.forEach(bankAccountDay => {
      bankAccountDay.transactions.forEach(transaction => {
        if (transaction.debit_credit == 'debit') this.totalDebit += 1;
        if (transaction.debit_credit == 'credit') this.totalCredit += 1;

        this.totalItems += 1;
      });
    });
  }

  // Calculate the total amount of debit and credit
  calculateTotalAmounts() {
    this.totalExpenses = 0;
    this.totalReceveievs = 0;

    this.bankAccounts.forEach(bankAccountDay => {
      bankAccountDay.transactions.forEach(transaction => {
        if (transaction.debit_credit == 'debit') this.totalExpenses += transaction.amount;
        if (transaction.debit_credit == 'credit') this.totalReceveievs += transaction.amount;
      });
    });
  }

  // Returns an rounded number with two decimals
  formatCurrency(amount: number) {
    return Math.round(amount * 100) / 100;
  }

  // Parses the date to the following format: [MMMM DD, YYYY]
  parseDate(date: string) {
    return moment(date, 'YYYYMMDD').format('MMMM DD, YYYY');
  }
}