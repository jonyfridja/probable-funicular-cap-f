export interface ITransaction {
    _id?: string;
    tradingparty: string;
    counterparty: string;
    amount: number;
}