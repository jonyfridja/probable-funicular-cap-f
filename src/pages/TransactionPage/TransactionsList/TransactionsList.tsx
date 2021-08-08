import React, { ReactElement } from 'react'
import TransactionPreview from '../TransactionPreview/TransactionPreview';

import './TransactionsList.scss';

interface Props {
    transactions: { party: string, amount: number, id: string }[];
    children?: React.ReactNode;
}

export default function TransactionsList({ transactions, children }: Props): ReactElement {
    return (
        <div className='transactions-list'>
            {children && <header>{children}</header>}
            {transactions.map(t => <TransactionPreview party={t.party} amount={t.amount} key={t.id} />)}
        </div>
    )
}


