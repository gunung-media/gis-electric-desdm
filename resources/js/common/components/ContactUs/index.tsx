import "./style.scss"
import WASVG from "@/assets/icons/WhatsApp.svg?react"

export const ContactUs = () => {
    return (
        <div className="contact-us">
            <button className="contact-us-btn" onClick={() => window.open('https://api.whatsapp.com/send/?phone=62895410535786&text=hello%20world&type=phone_number&app_absent=0', '_blank')?.focus()}>
                <WASVG />
            </button>
        </div>
    )
}
