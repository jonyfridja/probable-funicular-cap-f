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
    const [validateErrorMessage, setValidateErrorMessage] = useState('')
    const clearForm = () => {
        setAmount(0);
        setCounterParty('')
    }
    const onClose = () => {
        clearForm()
        props.onClose();
    }

    const validate = () => {
        let valid = false;
        if (!counterparty) {
            setValidateErrorMessage('Recipient is required')
            return valid
        }

        if (amount === 0) {
            setValidateErrorMessage('Please set Amount')
            return valid
        }

        return true
    }

    return (
        <Modal open={props.isOpen}>
            <OutsideAlerter onOutsideClicked={onClose}>
                <div className="transaction-form">
                    <form className="modal-body" onSubmit={(ev) => {
                        ev.preventDefault();
                        if (!validate()) return
                        
                        onSubmit({ counterparty, amount });
                        clearForm()
                    }}>
                        <div className="close-btn" onClick={() => onClose()}>X</div>
                        <label>
                            Recipient
                            <input required type="text" onChange={({ target }) => setCounterParty(target.value)} value={counterparty} />
                        </label>
                        <label>
                            How much?
                            <input required type="number" onChange={({ target }) => setAmount(+target.value)} value={amount} />
                        </label>
                        {validateErrorMessage && <div className="validate-error">{validateErrorMessage}</div>}
                        <button type="submit" className="app-button" disabled={disabled}>Add</button>
                    </form>
                </div>
            </OutsideAlerter>
        </Modal>

    )
}
