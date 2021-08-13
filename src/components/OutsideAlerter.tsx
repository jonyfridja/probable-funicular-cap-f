import React, { useRef, useEffect } from "react";

export function useOutsideAlerter(ref: any, onOutsideClicked?: Function) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (typeof onOutsideClicked === 'function') onOutsideClicked(event);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, onOutsideClicked]);
}

interface Props {
    onOutsideClicked?: Function;
    className?: string;
    children: any
}

export default function OutsideAlerter(props: Props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, props.onOutsideClicked);

    return <div ref={wrapperRef} className={props.className}>{props.children}</div>;
}