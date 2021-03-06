import axios from "axios";
import AuthAPI from "./auth_utils";

const BarAPI = {}
const BASE_URL = '/api/'

BarAPI.newBar = async (data) => {
    return await AuthAPI.tryCatchFetch(() => axios.post(`${BASE_URL}bars/`, data, AuthAPI.getCsrfConfig()));
};

BarAPI.fetchBar = async (barId) => {
    return await AuthAPI.tryCatchFetch(() => axios.get(`${BASE_URL}bars/${barId}`, AuthAPI.getCsrfConfig()));
};

BarAPI.updateBar = async (data, barId) => {
    return await AuthAPI.tryCatchFetch(() => axios.patch(`${BASE_URL}bars/${barId}/`, data, AuthAPI.getCsrfConfig()));
};

BarAPI.fetchAllBars = async () => {
    return await AuthAPI.tryCatchFetch(() => axios.get(`${BASE_URL}bars/`, AuthAPI.getCsrfConfig()));
};

BarAPI.deleteBar = async (barId) => {
    return await AuthAPI.tryCatchFetch(() => axios.delete(`${BASE_URL}bars/${barId}`, AuthAPI.getCsrfConfig()));
};

BarAPI.deleteBeer = async (barId) => {
    return await AuthAPI.tryCatchFetch(() => axios.delete(`${BASE_URL}beers/${barId}`, AuthAPI.getCsrfConfig()));
};

BarAPI.fetchBeer = async (beerId) => {
    return await AuthAPI.tryCatchFetch(() => axios.get(`${BASE_URL}beers/${beerId}`, AuthAPI.getCsrfConfig()));
};

BarAPI.newBeer = async (data) => {
    return await AuthAPI.tryCatchFetch(() => axios.post(`${BASE_URL}beers/`, data, AuthAPI.getCsrfConfig()));
};

BarAPI.updateBeer = async (data, id) => {
    return await AuthAPI.tryCatchFetch(() => axios.patch(`${BASE_URL}beers/${id}/`, data, AuthAPI.getCsrfConfig()));
};

BarAPI.getAllBfBeers = async () => {
    return await AuthAPI.tryCatchFetch(() => axios.get(`${BASE_URL}brew_father/`, AuthAPI.getCsrfConfig()));
}

BarAPI.getOneBfBeer = async (beerId) => {
    return await AuthAPI.tryCatchFetch(() => axios.get(`${BASE_URL}brew_father/${beerId}`, AuthAPI.getCsrfConfig()));
}

BarAPI.addBeerStat = async (data) => {
    return await AuthAPI.tryCatchFetch(() => axios.post(`${BASE_URL}beerstats/`,data, AuthAPI.getCsrfConfig()))
}

export default BarAPI