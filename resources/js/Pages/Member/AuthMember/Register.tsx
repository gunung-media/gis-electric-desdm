import { InputError, InputGroup, OptionType } from "@/common/components";
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory";
import { GuestLayout } from "@/layouts/GuestLayout";
import { useForm, usePage, Head } from "@inertiajs/react";
import { FormEventHandler, useState } from "react";

export default function Register() {
    const { errors } = usePage().props
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [_, setVillageCode] = useState<string | number>()

    const { data, setData, post } = useForm({
        nik: "",
        name: "",
        username: "",
        password: "",
        phone: "",
        address: "",
        village_code: "",
    });

    const handleCityChange = (e: OptionType<CityType>) => {
        setCityCode(e.value.code)
    }

    const handleDistrictChange = (e: OptionType<DistrictType>) => {
        setDistrictCode(e.value.code)
    }

    const handleVillageChange = (e: OptionType<VillageType>) => {
        setVillageCode(e.value.code)
        setData('village_code', e.value.code.toString())
    }

    const submit: FormEventHandler = (e) => {
        e.preventDefault()

        post(route('member.register'))
    }

    return (
        <GuestLayout>
            <Head title="Member Register" />
            <form className="pt-3" onSubmit={submit}>
                <div className="form-group">
                    <InputGroup
                        title="NIK"
                        icon="ti-user"
                        onChange={(e) => setData('nik', e.target.value)}
                    />

                    <InputError message={errors.nik} />
                </div>
                <div className="form-group">
                    <InputGroup
                        title="Nama"
                        icon="ti-user"
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} />
                </div>
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

                <div className="form-group">
                    <InputGroup
                        title="Nomor Telepon/WA"
                        icon="ti-lock"
                        onChange={(e) => setData('phone', e.target.value)}
                        type="text"
                    />

                    <InputError message={errors.phone} />
                </div>

                <SelectCity handleCityChange={handleCityChange} />
                <SelectDistrict handleDistrictChange={handleDistrictChange} selectedCityId={cityCode} />
                <SelectVillage handleVillageChange={handleVillageChange} selectedDistrictId={districtCode} />

                <div className="form-group">
                    <InputGroup
                        title="Adress"
                        icon="ti-lock"
                        onChange={(e) => setData('address', e.target.value)}
                        type="text"
                    />

                    <InputError message={errors.address} />
                </div>

                <div>
                    <p>Sudah memiliki akun?
                        <a href={route('member.login')}> Login</a> di sini.
                    </p>
                </div>
                <InputError message={errors.auth} />
                <div className="my-3">
                    <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">REGISTER</button>
                </div>
            </form>
        </GuestLayout>
    )
}
