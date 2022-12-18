import _jobs from '../data/jobs.json'

type Job = {
	id: number,
	url: string,
	title: string,
	company: string,
	description: string,
	skilllist: string,
	todo: string,
}

const jobs: Job[] = _jobs as any[]

export const PageJobs = () => {
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