import React, { ReactElement } from 'react'
import LoadingImage from '../assets/imgs/loading-red-spinner.svg';
interface Props {

}

export default function LoadingIcon({ }: Props): ReactElement {
    return (
        <img src={LoadingImage} alt="Loading red spinner" />
    )
}
