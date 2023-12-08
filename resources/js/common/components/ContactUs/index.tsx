import { useEffect, useState } from "react"
import "./style.scss"
import WASVG from "@/assets/icons/WhatsApp.svg?react"
import { getGuide } from "@/features/Guide/api"
import { GuideType } from "@/features/Guide"

export const ContactUs = () => {
    const [guide, setGuide] = useState<GuideType>()
    const getGuideData = async () => {
        const { data } = await getGuide()
        setGuide(data.data)
    }

    useEffect(() => {
        getGuideData()
    }, [])

    const handleClick = () => {
        window.open(`https://api.whatsapp.com/send/?phone=${guide?.no_wa}&text=Hallo Admin DESDM&type=phone_number&app_absent=0`, '_blank')?.focus()
    }

    return (
        <div className="contact-us">
            <button className="contact-us-btn" onClick={handleClick}>
                <WASVG />
            </button>
        </div>
    )
}
