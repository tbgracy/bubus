import Bus from "./types/Bus";
import BusStop from "./types/BusStop";

type State = {
  loadingStops: boolean,
  loadingBuses: boolean,
  data: {
    buses?: Bus[],
    stops?: BusStop[],
  }
  effects: Effect[],
  errorMessage?: string,
}


type Effect = "FETCH_STOPS" | "FETCH_BUSES" | null;

type Action = { type: 'CHANGE_TOWN' }
  | { type: 'DONE', data: BusStop[] | Bus[] }
  | { type: 'SEARCH' }
  | { type: 'ERROR', message: string }

const reducer = (currentState: State, event: Action): State => {
  if (event.type == 'CHANGE_TOWN') {
    return {
      loadingStops: true,
      loadingBuses: false,
      data: {},
      effects: ['FETCH_STOPS'],
    }
  }

  if (event.type == 'DONE') {
    if (currentState.loadingStops) {
      return {
        loadingStops: false,
        loadingBuses: false,
        data: {
          stops: event.data as BusStop[]
        },
        effects: [null]
      }
    }
    if (currentState.loadingBuses) {
      return {
        loadingStops: false,
        loadingBuses: false,
        data: {
          ...currentState.data,
          buses: event.data as Bus[],
        },
        effects: [null],
      }
    }
  }

  if (event.type == 'SEARCH') {
    return {
      loadingStops: false,
      loadingBuses: true,
      data: {
        ...currentState.data,
      },
      effects: ['FETCH_BUSES'],
    }
  }

  if (event.type == 'ERROR') {
    return {
      loadingStops: false,
      loadingBuses: false,
      data: {
        stops: [],
      },
      effects: [null],
    };
  }

  return currentState;
}

export type { State, Effect, Action };
export default reducer;