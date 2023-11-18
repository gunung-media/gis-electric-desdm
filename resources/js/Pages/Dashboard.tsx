import { AuthenticatedLayout } from "@/Layouts/AuthenticatedLayout"
import { PageProps } from "@/types"
import { useEffect } from "react"

export default function Dashboard({ assets }: PageProps) {
    return (
        <AuthenticatedLayout>
            <h1>Hello Mom</h1>
        </AuthenticatedLayout>
    )
}
