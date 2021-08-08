import React, { MouseEventHandler, ReactElement, useEffect } from 'react'
import { useState } from 'react'
import { USER_NAME } from '../../constants'
import { ITransaction } from '../../interfaces'
import { transactionsService } from '../../services/TransactionsService'
import TransactionsList from './TransactionsList/TransactionsList'

import './TransactionPage.scss';
import clsx from 'clsx'
import TransactionForm from './TransactionForm/TransactionForm'
import LoadingIcon from '../../components/LoadingIcon'
interface Props {

}

export default function TransactionPage({ }: Props): ReactElement {
    const [transactionsToUser, setTransactionsToUser] = useState<ITransaction[]>([])
    const [transactionsFromUser, setTransactionsFromUser] = useState<ITransaction[]>([])
    const [allTransactions, setAllTransactions] = useState<ITransaction[]>([])

    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    const [loadingNewTransaction, setLoadingNewTransaction] = useState(false)

    useEffect(() => {
        initTransactions()
    }, [])

    const initTransactions = async () => {
        const allTransactions = await transactionsService.get()
        const transToUser = allTransactions.filter(t => t.tradingParty === USER_NAME);
        const transactionsFromUser = allTransactions.filter(t => t.tradingParty !== USER_NAME);

        setAllTransactions(allTransactions)
        setTransactionsToUser(transToUser);
        setTransactionsFromUser(transactionsFromUser);
    }

    const onNewTransactionClick: MouseEventHandler = (ev) => {
        setShowAddTransactionForm(true);
    }

    const onCompressClick: MouseEventHandler = async (ev) => {

    }

    const onNewFormSubmit = async (transaction: Pick<ITransaction, "counterparty" | "amount">) => {
        let newTransaction: ITransaction = {
            ...transaction,
            tradingParty: USER_NAME
        }
        setLoadingNewTransaction(true);
        try {
            const serverResult = await transactionsService.create(newTransaction);
            if (serverResult.tradingParty === USER_NAME) setTransactionsFromUser([...transactionsFromUser, serverResult])
            else setTransactionsToUser([...transactionsToUser, serverResult])
        } catch (err) {
        } finally {
            setLoadingNewTransaction(false);
            setShowAddTransactionForm(false);
        }
    }


    return (
        <div className={clsx('transactions-page',)}>
            <section className={clsx('flex', 'space-around')}>
                <TransactionsList transactions={transactionsFromUser}><h1>Paying</h1></TransactionsList>
                <TransactionsList transactions={transactionsToUser}><h1>Receiving</h1></TransactionsList>
                <div className="flex">
                    <button onClick={onNewTransactionClick}>Add a new Transaction</button>
                    <button onClick={onCompressClick}>Compress</button>
                </div>
            </section>
            <section>
                {loadingNewTransaction && <LoadingIcon />}
                {showAddTransactionForm && <TransactionForm onSubmit={onNewFormSubmit} />}
            </section>
        </div>
    )
}
