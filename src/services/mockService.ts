import Bus from "../types/Bus";
import BusStop from "../types/BusStop";
import TownApiService from "./apiService";

export default class MockApiService implements TownApiService {
    async search(start: string, end: string): Promise<Bus[]> {
        console.log(`start bus id: ${start}, end bus id : ${end}`);

        const res = [
            {
                name: 'Bus 666',
            },
            {
                name: 'Bus 13',
            },
            {
                name: 'Bus 110',
            },
            {
                name: 'Bus 666',
            },
            {
                name: 'Bus 13',
            },
            {
                name: 'Bus 110',
            },
            {
                name: 'Bus 666',
            },
            {
                name: 'Bus 13',
            },
            {
                name: 'Bus 110',
            }
        ]

        return new Promise((resolve) => setTimeout(() => resolve(res), 1000))
    }

    async getStops(): Promise<BusStop[]> {
        return [
            {
                id: 1,
                name: 'Antsaha',
            },
            {
                id: 2,
                name: 'Vatofotsy',
            },
            {
                id: 3,
                name: 'Cathé',
            },
        ]
    }
}