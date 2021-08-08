import clsx from 'clsx'
import React, { ReactElement } from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function Button(props: Props): ReactElement {
    return (
        <button {...props} className={clsx("app-button", props.className)}>{props.children}</button>
    )
}
