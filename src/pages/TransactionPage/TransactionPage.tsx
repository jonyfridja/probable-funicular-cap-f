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
import Button from '../../components/Button'
import { CSVService } from '../../services/CSVService'

import { saveAs } from 'file-saver';
interface Props {

}

export default function TransactionPage({ }: Props): ReactElement {
    const [allTransactions, setAllTransactions] = useState<ITransaction[]>([])

    const [transactionsToUser, setTransactionsToUser] = useState<{ party: string, amount: number, id: string }[]>([])
    const [transactionsFromUser, setTransactionsFromUser] = useState<{ party: string, amount: number, id: string }[]>([])

    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    const [loadingNewTransaction, setLoadingNewTransaction] = useState(false)

    useEffect(() => {
        initTransactions()
    }, [])

    const initDerrivedState = () => {
        const organized = allTransactions.map(t => {
            if (t.tradingparty !== USER_NAME) {
                return {
                    ...t,
                    tradingparty: t.counterparty,
                    counterparty: t.tradingparty,
                    amount: t.amount * -1
                }
            }
            return t
        })
        const transactionsFromUser = organized.filter(t => t.amount > 0).map(t => ({ party: t.counterparty, amount: t.amount, id: t.id! }))
        const transToUser = organized.filter(t => t.amount < 0).map(t => ({ party: t.counterparty, amount: t.amount, id: t.id! }))

        setTransactionsToUser(transToUser);
        setTransactionsFromUser(transactionsFromUser);
    }

    const initTransactions = async () => {
        const allTransactions = await transactionsService.get()
        setAllTransactions(allTransactions)
    }

    useEffect(initDerrivedState, [allTransactions]);

    const onNewTransactionClick: MouseEventHandler = (ev) => {
        setShowAddTransactionForm(true);
    }

    const onCompressClick: MouseEventHandler = async (ev) => {
        const compressed = transactionsService.compress(allTransactions);
        console.log('compressed', compressed);
        const csv = CSVService.jsonToCSV(compressed, ['tradingparty', 'counterparty', 'amount']) || ''

        const csvFile = CSVService.CSVToFile(csv)
        saveAs(csvFile)
    }

    const onNewFormSubmit = async (transaction: Pick<ITransaction, "counterparty" | "amount">) => {
        let newTransaction: ITransaction = {
            ...transaction,
            tradingparty: USER_NAME
        }
        setLoadingNewTransaction(true);
        try {
            const serverResult = await transactionsService.create(newTransaction);
            setAllTransactions([...allTransactions, serverResult])
        } catch (err) {
        } finally {
            setLoadingNewTransaction(false);
            setShowAddTransactionForm(false);
        }
    }

    return (
        <div className={clsx('transactions-page',)}>
            <section className={clsx('flex', 'column')}>
                <div className={clsx('flex', 'space-around')}>
                    <TransactionsList transactions={transactionsFromUser}><h1>Paying</h1></TransactionsList>
                    <TransactionsList transactions={transactionsToUser}><h1>Receiving</h1></TransactionsList>
                </div>
                <div className={clsx('actions')}>
                    <Button onClick={onNewTransactionClick}>Add a new Transaction</Button>
                    <Button onClick={onCompressClick}>Compress</Button>
                </div>
            </section>
            <section>
                {loadingNewTransaction && <LoadingIcon />}
                <TransactionForm isOpen={showAddTransactionForm} disabled={loadingNewTransaction} onSubmit={onNewFormSubmit} />
            </section>
        </div>
    )
}
