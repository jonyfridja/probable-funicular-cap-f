import React, { ReactElement } from 'react'
import { ITransaction } from '../../../interfaces'

interface Props {
    transaction: ITransaction
}

export default function TransactionPreview({ }: Props): ReactElement {
    return (
        <div>
            preview
        </div>
    )
}
