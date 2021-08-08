import clsx from 'clsx'
import React, { ReactElement } from 'react'
import './TransactionPreview.scss';
interface Props {
    party: string;
    amount: number;
}

export default function TransactionPreview({ party, amount }: Props): ReactElement {
    return (
        <div className={clsx('transaction-preview', 'flex', 'space-between')}>
            <span>{party} </span><span>{amount}</span>
        </div>
    )
}
