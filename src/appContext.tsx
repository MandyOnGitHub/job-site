import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IJob, ITotaledSkill, ITodo, IBackendJob } from './interface';
 
interface IAppContext {
    jobs: IJob[],
    todos: ITodo[],
    totaledSkills: ITotaledSkill[];
    handleToggleTotaledSkill: (totaledSkill: ITotaledSkill) => void;
    handleDeleteJob: (job: IJob) => void;
    handleEditJob: (job: IJob) => void;
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
    

    const loadJobs = async () => {
        const rawJobs = (await axios.get(`${backendUrl}/jobs`)).data;
        const _jobs : IJob[] = []
        rawJobs.forEach((rawJob: IBackendJob)=>{
            const _job = {
                ...rawJob,
                userIsEditing: false,             
            }
            _jobs.push(_job);
        })
        setJobs(_jobs)
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

    const loadTotaledSkills = async () => {
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
    };

    const handleDeleteJob = async (job: IJob) => {
        try {
            const res = await axios.delete(`${backendUrl}/jobs/${job.id}`);
            if (res.status = 200) {
                // const _jobs = jobs.filter((availableJobs: IJob) => availableJobs.id !== job.id);
                // setJobs([..._jobs]);
                await loadJobs();
                await loadTodos();
                await loadTotaledSkills();
            } else {
                console.log(res)
            }
        } catch (e: any) {
            console.log(e);
            
        }
    };

    const handleEditJob = (job: IJob) => {
        job.userIsEditing = !job.userIsEditing;
        setJobs([...jobs])
    }
     


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
     
    useEffect(() => {
        (async () => {
            await loadTotaledSkills();
        })();
    }, []);
    

    return (
        <AppContext.Provider
            value={{
                jobs,
                todos,
                totaledSkills,
                handleToggleTotaledSkill,
                handleDeleteJob,
                handleEditJob
            }}
        >
            {children}
        </AppContext.Provider>
    );
}