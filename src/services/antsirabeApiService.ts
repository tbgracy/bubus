import axios from "axios";
import Bus from "../types/Bus";
import BusStop from "../types/BusStop";
import TownApiService from "./apiService";

export default class AntsirabeApiService implements TownApiService {
    BASE_URL = 'https://bus-antsirabe.onrender.com/api';
    REQUEST_TIMEOUT = -1; // need to set a global config for lesser code duplication

    async search(start: number, end: number): Promise<Bus[] | Error> {
        console.log(start, end);

        try {
            const res: Bus[] = [];
            const response = await axios.post(
                `${this.BASE_URL}/travel`,
                {
                    a: start,
                    b: end
                },
                { timeout: this.REQUEST_TIMEOUT }
            );
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
            const response = await axios.get(`${this.BASE_URL}/travel`, { timeout: this.REQUEST_TIMEOUT });
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