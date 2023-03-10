export interface IJob  {
    id: number;
    title: string;
    company: string;
    url: string;
    description: string;
    skillList: string;
    skills: ISkill[];
    todo: string;
    userIsEditing: boolean;
    editItem:IEditItem;
}

export interface IEditItem {
    title: string;
}
 
export interface ISkill  {
    idCode: string;
    name: string;
    url: string;
    description: string;
}

export interface ITodo {
    todoText: string;
	company: string;
	title: string;
	url: string;
}

export interface ITotaledSkill {
    skill: ISkill,
    total: number,
    isOpen: boolean, 
    lookupInfoLink: string,
}

export interface IBackendJob  {
    id: number;
    title: string;
    company: string;
    url: string;
    description: string;
    skillList: string;
    skills: ISkill[];
    todo: string;
}