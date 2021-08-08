export interface ITransaction {
    id?: string;
    tradingparty: string;
    counterparty: string;
    amount: number;
}