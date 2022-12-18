import axios from "axios";
import { useEffect, useState } from "react";



type Job = {
	id: number,
	url: string,
	title: string,
	company: string,
	description: string,
	skilllist: string,
	todo: string,
}


const url = 'http://localhost:5000';
 
export const PageJobs = () => {
	const [jobs, setJobs] = useState<Job[]>([]);
	 
	useEffect(() => {
		(async () => {
			setJobs((await axios.get(`${url}/jobs`)).data);
		})();
	}, []);
	

	return (
		<div className="pageJobs">
			<div className="jobs">
				<h2>There are {jobs.length} jobs:</h2>
				{jobs.map((job) => {
					return (
						<div className="job" key={job.id}>
							<div className="title">
								<a href={job.url} target="_blank">
									{job.title}
								</a>
							</div>
							<div className="company">{job.company}</div>
							<div className="description">{job.description}</div>
							<div className="skills">{job.skilllist}</div>
							<div className="todo">{job.todo}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};