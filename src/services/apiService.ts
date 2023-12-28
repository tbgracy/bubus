import Bus from "../types/Bus";
import BusStop from "../types/BusStop";

export default abstract class TownApiService {
    abstract search(start: string | number, end: string | number): Promise<Bus[] | Error>
    abstract getStops(): Promise<BusStop[] | Error>
}