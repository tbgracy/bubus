import axios from "axios";
import Bus from "../types/Bus";
import BusStop from "../types/BusStop";
import TownApiService from "./apiService";

export default class AntsirabeApiService implements TownApiService {
	BASE_URL = import.meta.env.VITE_ANTSIRABE_BUS_API_BASE_URL;
	REQUEST_TIMEOUT = -1;

	async search(start: number, end: number): Promise<Bus[]> {
		try {
			const body = JSON.stringify({ primus: start, terminus: end });
			const res: Bus[] = [];
			const response = await axios.post(`${this.BASE_URL}/travel`, body, {
				timeout: this.REQUEST_TIMEOUT,
				headers: {
					accept: "application/json",
					"content-type": "application/json",
				},
			});
			const data = response.data;
			for (const bus of data) {
				res.push({
					name: bus,
				});
			}
			return res;
		} catch (e) {
			throw e as Error;
		}
	}

	async getStops(): Promise<BusStop[]> {
		try {
			const res: BusStop[] = [];
			const response = await axios.get(`${this.BASE_URL}/travel`, {
				timeout: this.REQUEST_TIMEOUT,
			});
			const data = response.data;
			for (const stopId in data) {
				const stop = data[stopId];
				res.push({
					id: parseInt(stopId),
					name: stop,
				});
			}
			return res;
		} catch (e) {
			throw new Error((e as Error).message);
		}
	}
}
