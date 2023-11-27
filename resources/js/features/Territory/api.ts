import axios, { AxiosResponse } from "axios";
import { CityType, DistrictType, VillageType } from "./types";

const URL = `${import.meta.env.VITE_APP_URL}/api/indonesia`
const PROVINCE_NAME = "Kalimantan Tengah"

export const getCities = async (): Promise<AxiosResponse<{ data: CityType[] }>> => await axios.get(`${URL}/cities`, { params: { 'province_name': PROVINCE_NAME } })

export const getDistricts = async (cityCode: number | string): Promise<AxiosResponse<{ data: DistrictType[] }>> => await axios.get(`${URL}/districts`, { params: { 'city_code': cityCode } })

export const getVillages = async (districtCode: number | string): Promise<AxiosResponse<{ data: VillageType[] }>> => await axios.get(`${URL}/villages`, { params: { 'district_code': districtCode } })

export const getKaltengVillages = async (): Promise<AxiosResponse<{ data: VillageType[] }>> => await axios.get(`${URL}/kalteng/villages`)
