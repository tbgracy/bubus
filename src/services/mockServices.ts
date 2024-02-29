import Bus from "../types/Bus";
import BusStop from "../types/BusStop";
import TownApiService from "./apiService";



class MockApiService1 implements TownApiService {
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
        const res = [
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
        return new Promise((resolve) => setTimeout(() => resolve(res), 1000))
    }
}

class MockApiService2 implements TownApiService {
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
        const res = [
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
        return new Promise((resolve) => setTimeout(() => resolve(res), 1000))
    }
}

export { MockApiService1, MockApiService2 };