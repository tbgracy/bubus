import { createContext } from "react";
import { LocalRepositoryImpl, RepositoryImpl } from "./repository";
import AntsirabeApiService from "./services/antsirabeApiService";
import MahajangaApiService from "./services/mahajangaApiService";
import { MockApiService1, MockApiService2 } from "./services/mockServices";

const inDevEnv = (import.meta.env.VITE_DEV as number) != null ? true : false;
console.log(inDevEnv);

const initialValue = inDevEnv ? {
    towns: [
        { code: 0, name: 'Imaginary 1' },
        { code: 1, name: 'Imaginary 2' },
    ],
    repository: new LocalRepositoryImpl(new MockApiService1(), new MockApiService2()),

} : {
    towns: [
        { code: 110, name: 'Antsirabe' },
        { code: 401, name: 'Mahajanga' }
    ],
    repository: new RepositoryImpl(new AntsirabeApiService(), new MahajangaApiService()),
};

const RepositoryContext = createContext(initialValue);

export default RepositoryContext;
export { initialValue };