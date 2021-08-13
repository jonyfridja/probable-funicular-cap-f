import { ITransaction } from "../interfaces";
import { httpService } from "./HttpService";

class TransactionsService {
    async get() {
        return httpService.get<ITransaction[]>('/transactions').then(res => res.data) || []
    }

    create(transaction: ITransaction): Promise<ITransaction> {
        return httpService.post<ITransaction>('/transactions', transaction).then(res => res.data)
    }

    compress = (transactions: ITransaction[]) => {
        function makeKeysStable(_transactions: ITransaction[]) {
            return _transactions.map(t => {
                if (t.tradingparty < t.counterparty) {
                    return {
                        ...t,
                        counterparty: t.tradingparty,
                        tradingparty: t.counterparty,
                        amount: t.amount * -1
                    }
                }
                return t
            })
        }

        const stableKeyedTransactions = makeKeysStable(transactions)

        const delimiter = '__@@__';
        let res = stableKeyedTransactions.reduce((acc, t) => {
            let key = t.tradingparty + delimiter + t.counterparty;
            if (acc[key]) acc[key].amount += t.amount;
            else acc[key] = { key, amount: t.amount }
            return acc
        }, {} as Record<string, { key: string, amount: number }>);

        let compressed = []
        for (const key in res) {
            const curr = res[key]
            const [tradingparty, counterparty] = key.split(delimiter);
            compressed.push({
                counterparty,
                tradingparty,
                amount: curr.amount
            })
        }

        return compressed
    }

}

export const transactionsService = new TransactionsService();

