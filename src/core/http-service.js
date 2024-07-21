import axios from "axios";

const BASE_URL = "https://api.nekatel.com/nekatel/api";

export const httpService = axios.create({
    baseURL: BASE_URL
});
