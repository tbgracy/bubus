import axios from "axios";
import Bus from "../types/Bus";
import BusStop from "../types/BusStop";
import TownApiService from "./apiService";

export default class MahajangaApiService implements TownApiService {
    BASE_URL = 'https://bus-mj.onrender.com/api';

    async search(start: string, end: string): Promise<Bus[] | Error> {
        console.log(start, end);

        try {
            const res: Bus[] = [];
            const response = await axios.get(`${this.BASE_URL}?depart=${start}&fin${end}`);
            const data = response.data;
            for (const busId in data) {
                console.log(busId);
            }
            return res;
        } catch (e) {
            return new Error(`${e}`)
        }
    }

    async getStops(): Promise<BusStop[] | Error> {
        try {
            const res: BusStop[] = [];
            const response = await axios.get(`${this.BASE_URL}/stop/all`);
            const data = response.data;

            for (const stopId in data) {
                const stop = data[stopId];
                res.push({
                    id: parseInt(stopId),
                    name: stop
                })
            }
            return res;
        } catch (e) {
            return new Error(`${e}`)
        }
    }
}