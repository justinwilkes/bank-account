export interface IBalance {
    amount: number;
    debit_credit: 'debit' | 'credit';
    date: string;
}

export interface IBankAccount {
    id: string;
    iban: string;
    date: string;
    balances: IBalance[];
    transactions: ITransaction[];
}

export interface ITransaction {
    iban: string;
    name: string;
    amount: number;
    debit_credit: 'debit' | 'credit';
    date: string;
    description: string;    
}