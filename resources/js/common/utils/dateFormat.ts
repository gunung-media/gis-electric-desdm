export function dateFormat(dateString?: string | null) {
    if (!dateString) {
        return ""
    }
    const dateObject = new Date(dateString);
    const indonesianDatetime = new Intl.DateTimeFormat("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
    }).format(dateObject);
    return indonesianDatetime
}
