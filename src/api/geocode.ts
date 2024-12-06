import axios from 'axios';
import {parseGeoData} from '../utils/utils';
import {SearchResult} from "../types/types.ts";
import {API_KEY} from "./api.ts";

export const fetchGeocode = async (query: string): Promise<SearchResult> => {
    try {
        const response = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${query}&format=json`);
        return parseGeoData(response.data);
    } catch (error) {
        console.error("Ошибка при поиске:", error);
        throw error;
    }
};
