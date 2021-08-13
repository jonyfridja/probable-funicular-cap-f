import { USER_NAME } from "../constants";
import { ITransaction } from "../interfaces";
import { httpService } from "./HttpService";

class TransactionsService {
    async get() {
        return httpService.get<ITransaction[]>('/transactions').then(res => res.data) || []
    }

    create(transaction: ITransaction): Promise<ITransaction> {
        return httpService.post<ITransaction>('/transactions', transaction).then(res => res.data)
    }

    async compress(transactions: ITransaction[]) {
        return httpService.post<ITransaction[]>('/transactions/compress', transactions).then(res => res.data)
    }
    
}

export const transactionsService = new TransactionsService();

