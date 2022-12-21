import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IJob, ISkill, ITodo } from './types';
 
interface IAppContext {
    jobs: IJob[],
    todos: ITodo[],
}
 
interface IAppProvider {
    children: React.ReactNode;
}
 
const backendUrl = 'http://localhost:5000';
 
export const AppContext = createContext<IAppContext>({} as IAppContext);
 
export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [todos, setTodos] = useState<ITodo[]>([]);
 
    const loadJobs = () => {
        (async ()=> {
            setJobs((await axios.get(`${backendUrl}/jobs`)).data)
        })
    }

    const loadTodos = async () => {
		(async () => {
			const _todos = (await axios.get(`${backendUrl}/todos`)).data;
			_todos.sort((a: ITodo, b: ITodo) => a.todoText > b.todoText);
			setTodos(_todos);
		})();
	};

    useEffect(() => {
		(async () => {
			await loadJobs();
		})();
	}, []);
    
	useEffect(() => {
		(async () => {
			await loadTodos();
		})();
	}, []);

    return (
        <AppContext.Provider
            value={{
                jobs,
                todos,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}