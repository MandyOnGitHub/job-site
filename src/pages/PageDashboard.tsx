import { useContext} from 'react';
import { AppContext } from '../appContext';

export const PageDashboard = () => {

	const {todos }= useContext(AppContext)

	return (
		<div className="page pageDashboard">
			<h2>Todos</h2>
			<div className="todos">
				{todos.map((todo:any, i:any)=>{
					return(
						<ul>
							<li key={i} >{todo.text}: <a target="_blanc" href={todo.url}>{todo.title} at {todo.company}</a></li>
						</ul>
					)
				})}
			</div>
		</div>
	);
};
