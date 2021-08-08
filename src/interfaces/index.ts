export interface ITransaction {
    id: string;
    tradingParty: string;
    counterparty: string;
    amount: number;
}