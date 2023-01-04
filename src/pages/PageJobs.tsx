import React, { useContext } from 'react';
import { AppContext } from '../appContext';
import { IJob } from '../interface';
import { JobDisplay } from '../components/JobDisplay';
import { JobEdit } from '../components/JobEdit';



export const PageJobs = () => {
    const { jobs, handleDeleteJob } = useContext(AppContext);

    return (
        <div className="page pageJobs">
            <div className="jobs">
                <h2>There are {jobs.length} jobs:</h2>
                {jobs.map((job: IJob) => {
                    return (
                        <React.Fragment key={job.id} >
                        {job.userIsEditing ? 
                        (
                            <JobEdit job={job} />
                        ):
                        (
                            <JobDisplay job={job} /> 
                        )
                        }
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

