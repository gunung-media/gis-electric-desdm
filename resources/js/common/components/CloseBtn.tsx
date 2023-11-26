import { FC } from "react";

export const CloseBtn: FC<{
    onClick: () => void
}> = ({ onClick }) => (
    <svg width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
        <line x1="4.80272" y1="20.6317" x2="21.0662" y2="4.36828" stroke="#AEAEAE" strokeWidth="2" strokeLinecap="round" />
        <line x1="21.0662" y1="20.6317" x2="4.80272" y2="4.36827" stroke="#AEAEAE" strokeWidth="2" strokeLinecap="round" />
    </svg>
)
