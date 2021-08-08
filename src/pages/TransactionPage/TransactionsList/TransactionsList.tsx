import React, { ReactElement } from 'react'
import { ITransaction } from '../../../interfaces'
import TransactionPreview from '../TransactionPreview/TransactionPreview';

import './TransactionsList.scss';

interface Props {
    transactions: ITransaction[];
    children?: React.ReactNode;
}

export default function TransactionsList({ transactions, children }: Props): ReactElement {
    return (
        <div className='transactions-list'>
            {children && <header>{children}</header>}
            {transactions.map(t => <TransactionPreview transaction={t} key={t.id} />)}
        </div>
    )
}


