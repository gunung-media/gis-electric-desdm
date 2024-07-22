import { InputError, InputGroup } from "@/common/components";
import { GuestLayout } from "@/layouts/GuestLayout";
import { useForm, usePage, Head } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function Login() {
    const { errors } = usePage().props

    const { data, setData, post } = useForm({
        username: "",
        password: ""
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('login'))
    }
    return (
        <GuestLayout>
            <Head title="Login" />
            <form className="pt-3" onSubmit={submit}>
                <div className="form-group">
                    <InputGroup
                        title="Username"
                        icon="ti-user"
                        onChange={(e) => setData('username', e.target.value)}
                    />

                    <InputError message={errors.username} />
                </div>
                <div className="form-group">
                    <InputGroup
                        title="Password"
                        icon="ti-lock"
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                    />

                    <InputError message={errors.password} />
                </div>
                <InputError message={errors.auth} />
                <div className="my-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">LOGIN</button>
                </div>
            </form>
        </GuestLayout>
    )
}
