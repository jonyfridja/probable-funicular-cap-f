import React, { ReactElement, useState } from 'react'
import { ITransaction } from '../../../interfaces';

interface Props {
    onSubmit: (transaction: Pick<ITransaction, "counterparty" | "amount">) => any;
    disabled?: boolean
}

export default function TransactionForm({ onSubmit, disabled }: Props): ReactElement {
    const [counterparty, setCounterParty] = useState<string>('');
    const [amount, setAmount] = useState(0)

    return (
        <form onSubmit={(ev) => {
            ev.preventDefault();
            onSubmit({ counterparty, amount })
        }}>
            <label>
                Recipient
                <input type="text" onChange={({ target }) => setCounterParty(target.value)} value={counterparty} />
            </label>
            <label>
                How much?
                <input type="number" onChange={({ target }) => setAmount(+target.value)} value={amount} />
            </label>
            <button disabled={disabled}>Add</button>
        </form>
    )
}
