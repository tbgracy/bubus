import AntsirabeApiService from "./services/antsirabeApiService";
import MahajangaApiService from "./services/mahajangaApiService";
import { MockApiService1, MockApiService2 } from "./services/mockServices";
import Bus from "./types/Bus";
import BusStop from "./types/BusStop";
import Town from "./types/Town";

export interface Repository {
    getBuses(start: BusStop, end: BusStop, town: Town): Promise<Bus[] | Error>;
    getStops(town: Town): Promise<BusStop[] | Error>;
}

export class LocalRepositoryImpl implements Repository {
    mockApiService1: MockApiService1;
    mockApiService2: MockApiService2;

    constructor(
        mockApiService1: MockApiService1,
        mockApiService2: MockApiService2,
    ) {
        this.mockApiService1 = mockApiService1;
        this.mockApiService2 = mockApiService2;
    }

    async getBuses(start: BusStop, end: BusStop, town: Town): Promise<Bus[] | Error> {
        try {

            if (town.code === 0) {
                return this.mockApiService1.search(start.id as string, end.id as string);
            }
            return this.mockApiService2.search(start.id as string, end.id as string);
        } catch (e) {
            return new Error('Une erreur est survenue');
        }
    }

    async getStops(town: Town): Promise<BusStop[] | Error> {
        let stops: BusStop[];
        try {
            switch (town.code) {
                case 0:
                    stops = await this.mockApiService1.getStops();
                    break;
                default:
                    stops = await this.mockApiService2.getStops();
            }
            return stops;
        } catch (e) {
            return new Error('Une erreur est survenue');
        }
    }
}

export class RepositoryImpl implements Repository {
    antsirabeApiService: AntsirabeApiService;
    mahajangaApiService: MahajangaApiService;

    constructor(
        antsirabeApiService: AntsirabeApiService,
        mahajangaApiService: MahajangaApiService,
    ) {
        this.antsirabeApiService = antsirabeApiService;
        this.mahajangaApiService = mahajangaApiService;
    }

    async getBuses(start: BusStop, end: BusStop, town: Town): Promise<Bus[] | Error> {
        let buses: Bus[];
        try {
            if (town.code === 110) {
                buses = await this.antsirabeApiService.search(Number.parseInt(start.id as string), Number.parseInt(end.id as string));
            }
            else if (town.code === 401) {
                buses = await this.mahajangaApiService.search(start.id as string, end.id as string);
            }
            else {
                return new Error('Ville non trouvée');
            }
            return buses;
        } catch (e) {
            return new Error('Une erreur est survenue');
        }
    }

    async getStops(town: Town): Promise<BusStop[] | Error> {
        let stops: BusStop[];
        try {
            switch (town.code) {
                case 110:
                    stops = await this.antsirabeApiService.getStops();
                    break;
                case 401:
                    stops = await this.mahajangaApiService.getStops();
                    break;
                default:
                    return new Error('Ville non trouvée');
            }
            return stops;
        } catch (e) {
            return new Error('Une erreur est survenue');
        }
    }
}