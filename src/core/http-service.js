import axios from "axios";


// const BASE_URL = "http://185.126.8.108/NOMS-BE/API";
const BASE_URL = "http://localhost:3000/nekatel/api";

export const httpService = axios.create({
    baseURL: BASE_URL
});
