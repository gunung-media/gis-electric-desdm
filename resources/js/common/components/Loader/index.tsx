import { FC } from "react";
import ReactLoading from "react-loading";
import './styles.scss'

export const Loader: FC<{
    isShow: boolean
}> = ({ isShow }) => {
    return (
        <>
            {isShow && (
                <div className='overlay'>
                    <ReactLoading height={'20%'} width={'20%'} className='loader' type='spinningBubbles' />
                </div>
            )}
        </>
    )
}
