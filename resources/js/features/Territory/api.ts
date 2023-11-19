import axios, { AxiosResponse } from "axios";
import { CityType, DistrictType } from "./types";

const URL = `${import.meta.env.VITE_APP_URL}/api/indonesia`
const PROVINCE_NAME = "Kalimantan Tengah"

export const getCities = async (): Promise<AxiosResponse<{ data: CityType[] }>> => await axios.get(`${URL}/cities`, { params: { 'province_name': PROVINCE_NAME } })

export const getDistricts = async (cityCode: number): Promise<AxiosResponse<{ data: DistrictType[] }>> => await axios.get(`${URL}/districts`, { params: { 'city_code': cityCode } })
