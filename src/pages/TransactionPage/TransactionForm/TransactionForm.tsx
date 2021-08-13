import { Modal } from '@material-ui/core';
import React, { ReactElement, useState } from 'react'
import OutsideAlerter from '../../../components/OutsideAlerter';
import { ITransaction } from '../../../interfaces';
import './TransactionForm.scss';
interface Props {
    onSubmit: (transaction: Pick<ITransaction, "counterparty" | "amount">) => any;
    disabled?: boolean;
    isOpen: boolean;
    onClose: Function
}
export default function TransactionForm({ onSubmit, disabled, ...props }: Props): ReactElement {
    const [counterparty, setCounterParty] = useState<string>('');
    const [amount, setAmount] = useState(0)

    return (
        <Modal open={props.isOpen}>
            <OutsideAlerter onOutsideClicked={props.onClose}>
                <div className="transaction-form">
                    <form className="modal-body" onSubmit={(ev) => {
                        ev.preventDefault();
                        onSubmit({ counterparty, amount })
                    }}>
                        <div className="close-btn" onClick={() => props.onClose()}>X</div>
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
            </OutsideAlerter>
        </Modal>

    )
}
