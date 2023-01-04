import { useContext } from 'react';
import { AppContext } from '../appContext';
import { IJob } from '../interface';
 
interface IProps {
    job: IJob;
}
 
export const JobEdit = ({ job }: IProps) => {
    const { handleChangeFormField } = useContext(AppContext);
 
    return (
        <form>
            <fieldset>
                <legend>Editing Job</legend>
 
                <div className="row">
                    <label>Title</label>
                    <div>
                        <input
                            value={job.editItem.title}
                            type="text"
                            onChange={(e) =>
                                handleChangeFormField(
                                    e.target.value,
                                    job,
                                    'title'
                                )
                            }
                        />
                    </div>
                </div>
 
                
                <div className="buttonRow">
                    <button >
                        Clear
                    </button>
                    <button disabled>Save</button>
                </div>
            </fieldset>
        </form>
    );
};
