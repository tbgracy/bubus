import { createContext } from "react";
import { RepositoryImpl } from "./repository";
import AntsirabeApiService from "./services/antsirabeApiService";
import MahajangaApiService from "./services/mahajangaApiService";
import MockApiService from "./services/mockService";

const initialValue = {
    towns: [
        { code: 0, name: 'Imaginary' },
        { code: 110, name: 'Antsirabe' },
        { code: 401, name: 'Mahajanga' }
    ],
    repository: new RepositoryImpl(new AntsirabeApiService(), new MahajangaApiService(), new MockApiService())
};

const RepositoryContext = createContext(initialValue);

export default RepositoryContext;
export { initialValue };