import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { Job, Skill } from './types';
 
interface IAppContext {
    jobs: Job[]
}
 
interface IAppProvider {
    children: React.ReactNode;
}
 
const backendUrl = 'http://localhost:5000';
 
export const AppContext = createContext<IAppContext>({} as IAppContext);
 
export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [jobs, setJobs] = useState<Job[]>([]);
 
    useEffect(() => {
        (async () => {
            setJobs((await axios.get(`${backendUrl}/jobs`)).data);
        })();
    }, []);
    return (
        <AppContext.Provider
            value={{
                jobs
            }}
        >
            {children}
        </AppContext.Provider>
    );
}