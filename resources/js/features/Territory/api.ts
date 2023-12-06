import axios, { AxiosResponse } from "axios";
import { CityType, DistrictType, TerritoryType, VillageType } from "./types";

const URL = `${import.meta.env.VITE_APP_URL}/api/indonesia`
const PROVINCE_NAME = "Kalimantan Tengah"

export const getCities = async (): Promise<AxiosResponse<{ data: CityType[] }>> => await axios.get(`${URL}/cities`, { params: { 'province_name': PROVINCE_NAME } })

export const getCityWithDistrict = async (): Promise<AxiosResponse<{ data: CityType[] }>> => await axios.get(route('api.kaltengCity'))

export const getCity = async (cityId: number | string): Promise<AxiosResponse<{ data: CityType }>> => await axios.get(route('api.cityInfo', { cityId: cityId }))

export const getDistricts = async (cityCode: number | string): Promise<AxiosResponse<{ data: DistrictType[] }>> => await axios.get(`${URL}/districts`, { params: { 'city_code': cityCode } })

export const getDistrictsWithVillageInfo = async (cityCode: number | string): Promise<AxiosResponse<{ data: DistrictType[] }>> => await axios.get(route('api.districtWithElectric', { cityCode: cityCode }))

export const getDistrict = async (districtId: number | string): Promise<AxiosResponse<{ data: DistrictType }>> => await axios.get(route('api.districtInfo', { districtId }))

export const getVillages = async (districtCode: number | string): Promise<AxiosResponse<{ data: VillageType[] }>> => await axios.get(`${URL}/villages`, { params: { 'district_code': districtCode } })

export const getKaltengVillages = async (districtCode?: number | string): Promise<AxiosResponse<{ data: VillageType[] }>> => await axios.get(`${URL}/kalteng/villages`, { params: { 'district_code': districtCode } })

export const searchTerritory = async (input: string): Promise<AxiosResponse<{ data: TerritoryType[] }>> => await axios.get(route('api.searcher'), { params: { 'input': input } })
