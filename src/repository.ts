import AntsirabeApiService from "./services/antsirabeApiService";
import MahajangaApiService from "./services/mahajangaApiService";
import MockApiService from "./services/mockService";
import Bus from "./types/Bus";
import BusStop from "./types/BusStop";
import Town from "./types/Town";

export interface Repository {
    getBuses(start: BusStop, end: BusStop, town: Town): Promise<Bus[] | Error>;
    getStops(town: Town): Promise<BusStop[] | Error>;
}

export class RepositoryImpl implements Repository {
    antsirabeApiService: AntsirabeApiService;
    mahajangaApiService: MahajangaApiService;
    mockApiService: MockApiService;

    constructor(
        antsirabeApiService: AntsirabeApiService,
        mahajangaApiService: MahajangaApiService,
        mockApiService: MockApiService,
    ) {
        this.antsirabeApiService = antsirabeApiService;
        this.mahajangaApiService = mahajangaApiService;
        this.mockApiService = mockApiService;
    }

    async getBuses(start: BusStop, end: BusStop, town: Town): Promise<Bus[] | Error> {
        try {

            if (town.code === 110) {
                return this.antsirabeApiService.search(start.id as number, end.id as number);
            }
            if (town.code === 401) {
                return this.mahajangaApiService.search(start.id as string, end.id as string);
            }
            return this.mockApiService.search(start.id as string, end.id as string);
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
                    stops = await this.mockApiService.getStops();
            }
            return stops;
        } catch (e) {
            return new Error('Une erreur est survenue');
        }
    }
}