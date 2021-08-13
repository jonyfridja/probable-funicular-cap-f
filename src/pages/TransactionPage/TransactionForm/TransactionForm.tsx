import { Modal } from '@material-ui/core';
import React, { ReactElement, useState } from 'react'
import { ITransaction } from '../../../interfaces';
import './TransactionForm.scss';
interface Props {
    onSubmit: (transaction: Pick<ITransaction, "counterparty" | "amount">) => any;
    disabled?: boolean;
    isOpen: boolean;
}
export default function TransactionForm({ onSubmit, disabled, ...props }: Props): ReactElement {
    const [counterparty, setCounterParty] = useState<string>('');
    const [amount, setAmount] = useState(0)

    return (
        <Modal open={props.isOpen}>
            <div className="transaction-form">
                <div className="close-btn">X</div>
                <form className="modal-body" onSubmit={(ev) => {
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
            </div>
        </Modal>

    )
}
