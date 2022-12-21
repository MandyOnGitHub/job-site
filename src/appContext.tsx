import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IJob, ITotaledSkill, ITodo } from './interface';
 
interface IAppContext {
    jobs: IJob[],
    todos: ITodo[],
    totaledSkills: ITotaledSkill[];
    handleToggleTotaledSkill: (totaledSkill: ITotaledSkill) => void;
}
 
interface IAppProvider {
    children: React.ReactNode;
}
 
const backendUrl = 'http://localhost:5000';
 
export const AppContext = createContext<IAppContext>({} as IAppContext);
 
export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [totaledSkills, setTotaledSkills] = useState<ITotaledSkill[]>([]);
     
    console.log(totaledSkills);
    

    const loadJobs = () => {
        (async()=>{
            setJobs((await axios.get(`${backendUrl}/jobs`)).data);         
        })()
    }

    const loadTodos = async () => {
		(async () => {
			const _todos = (await axios.get(`${backendUrl}/todos`)).data;
			_todos.sort((a: ITodo, b: ITodo) => a.todoText > b.todoText);
			setTodos(_todos);
		})();
	};

    const handleToggleTotaledSkill = (totaledSkill: ITotaledSkill) => {
        totaledSkill.isOpen = !totaledSkill.isOpen;
        setTotaledSkills([...totaledSkills]);
    };


    
	useEffect(() => {
        loadTodos()
	}, []);    
    
    
    useEffect(() => {
        loadJobs()
    }, []);

    useEffect(() => {
        (async () => {
            const _totaledSkills: ITotaledSkill[] = (
                await axios.get(`${backendUrl}/totaledSkills`)
            ).data;
            _totaledSkills.sort(
                (a: ITotaledSkill, b: ITotaledSkill) =>
                    Number(b.total) - Number(a.total)
            );
            _totaledSkills.forEach((_totaledSkill) => {
                _totaledSkill.isOpen = false;
                if (_totaledSkill.skill.name) {
                    _totaledSkill.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_totaledSkill.skill.name}`;
                } else {
                    _totaledSkill.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_totaledSkill.skill.idCode}`;
                }
            });
            setTotaledSkills(_totaledSkills);
        })();
    }, []);
     

    return (
        <AppContext.Provider
            value={{
                jobs,
                todos,
                totaledSkills,
                handleToggleTotaledSkill,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}