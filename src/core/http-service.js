import axios from "axios";


const BASE_URL = "http://185.126.8.108/NOMS-BE/api";

export const httpService = axios.create({
    baseURL: BASE_URL
});