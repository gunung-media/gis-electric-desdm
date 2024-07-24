import { InputError, Input, OptionalSelect, FormGroup, OptionType } from "@/common/components";
import { swalError, swalSuccess } from "@/common/utils";
import { MemberDTO, MemberType } from "@/features/Member";
import { CityType, DistrictType, SelectCity, SelectDistrict, SelectVillage, VillageType } from "@/features/Territory";
import { AuthenticatedLayout } from "@/layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";

export default function Form({ member }: PageProps & { member?: MemberType }) {
    const { errors } = usePage<PageProps>().props
    const { data: dto, setData, post } = useForm<MemberDTO>()
    const [cityCode, setCityCode] = useState<string | number>()
    const [districtCode, setDistrictCode] = useState<string | number>()
    const [villageCode, setVillageCode] = useState<string | number>()

    useEffect(() => {
        if (!member) return;
        const {
            village: {
                code: village_code,
                district: {
                    code: districtCode,
                    city_code,
                }
            },
            name, nik, address, username, phone } = member
        setVillageCode(village_code)
        setDistrictCode(districtCode)
        setCityCode(city_code)
        setData(data => ({
            ...data,
            name,
            nik, phone,
            village_code,
            address,
            username
        }))
    }, [member])

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault()
        if (member) {
            router.post(route('admin.users.update', { user: member.id }), {
                _method: 'put',
                ...dto
            }, {
                onError: (e) => {
                    swalError(e.error)
                },
                onSuccess: () => {
                    swalSuccess('Sukses Mengupdate')
                }
            })
            return
        }
        post(route('admin.users.store'), {
            onError: (e) => {
                swalError(e.error)
            },
            onSuccess: () => {
                swalSuccess('Sukses Menambah')
            }
        })
    }

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

    return (
        <AuthenticatedLayout>
            <Head title="Member Form" />
            <div className="row">
                <div className="col-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Member Form</h4>
                            <InputError message={errors.error} />
                            <form className="forms-sample" onSubmit={handleSubmit}>
                                <FormGroup
                                    title="Nama"
                                    name="name"
                                    errorMsg={errors.name}
                                    value={dto.name}
                                    onChange={(e) => setData('name', (e as any).target.value)}
                                />

                                <FormGroup
                                    title="NIK"
                                    name="nik"
                                    errorMsg={errors.nik}
                                    value={dto.nik}
                                    onChange={(e) => setData('nik', (e as any).target.value)}
                                />

                                <FormGroup
                                    title="Username"
                                    name="username"
                                    errorMsg={errors.username}
                                    value={dto.username}
                                    onChange={(e) => setData('username', (e as any).target.value)}
                                />
                                <FormGroup
                                    title="Password"
                                    name="password"
                                    errorMsg={errors.password}
                                    value={dto.password}
                                    onChange={(e) => setData('password', (e as any).target.value)}
                                    type="password"
                                />

                                <FormGroup
                                    title="Nomor Handphone"
                                    name="phone"
                                    errorMsg={errors.phone}
                                    value={dto.phone}
                                    onChange={(e) => setData('phone', (e as any).target.value)}
                                />

                                <FormGroup
                                    title="Alamat"
                                    name="address"
                                    errorMsg={errors.address}
                                    value={dto.address}
                                    onChange={(e) => setData('address', (e as any).target.value)}
                                />

                                <SelectCity
                                    handleCityChange={handleCityChange}
                                    selectedCity={cityCode}
                                />
                                <SelectDistrict
                                    handleDistrictChange={handleDistrictChange}
                                    selectedCityId={cityCode}
                                    selectedDistrict={districtCode}
                                />
                                <SelectVillage
                                    handleVillageChange={handleVillageChange}
                                    selectedDistrictId={districtCode}
                                    selectedVillage={villageCode}
                                />
                                <InputError message={errors.village_code} />

                                <button type="submit" className="btn btn-primary me-2">Submit</button>
                                <button type="button" className="btn btn-light" onClick={() => router.visit(route('admin.user.index'))}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    )
}
