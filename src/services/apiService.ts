import Bus from "../types/Bus";
import BusStop from "../types/BusStop";

export default abstract class TownApiService {
    abstract search(start: string | number, end: string | number): Promise<Bus[]>
    abstract getStops(): Promise<BusStop[]>
}