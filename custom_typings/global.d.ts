interface IBalance {
    amount: number;
    debit_credit: 'debit' | 'credit';
    date: string;
}

interface IBankAccount {
    id: string;
    iban: string;
    date: string;
    balances: IBalance[];
    transactions: ITransaction[];
}

interface ITransaction {
    iban: string;
    name: string;
    amount: number;
    debit_credit: 'debit' | 'credit';
    date: string;
    description: string;    
}