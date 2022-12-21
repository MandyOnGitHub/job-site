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
						<ul key={i}>
							<li  >{todo.todoText}: <a target="_blanc" href={todo.url}>{todo.company}</a> {todo.title}</li>
						</ul>
					)
				})}
			</div>
		</div>
	);
};
