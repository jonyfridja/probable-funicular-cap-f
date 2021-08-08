import React, { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import { USER_NAME } from '../../constants'
import { ITransaction } from '../../interfaces'
import { transactionsService } from '../../services/TransactionsService'
import TransactionsList from './TransactionsList/TransactionsList'

interface Props {

}

export default function TransactionPage({ }: Props): ReactElement {
    const [transactionsToUser, setTransactionsToUser] = useState<ITransaction[]>([])
    const [transactionsFromUser, setTransactionsFromUser] = useState<ITransaction[]>([])

    useEffect(() => {
        initTransactions()
    }, [])

    const initTransactions = async () => {
        const allTransactions = await transactionsService.get()
        const transToUser = allTransactions.filter(t => t.tradingParty === USER_NAME);
        const transactionsFromUser = allTransactions.filter(t => t.tradingParty !== USER_NAME);
        setTransactionsToUser(transToUser);
        setTransactionsFromUser(transactionsFromUser);
    }

    return (
        <div>
            <TransactionsList transactions={transactionsFromUser}><h1>Paying</h1></TransactionsList>
            <TransactionsList transactions={transactionsToUser}><h1>Receiving</h1></TransactionsList>
        </div>
    )
}
