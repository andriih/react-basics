import React from 'react'

function Stats (props){
	let total = props.todos.length
	let completed = props.todos.filter(todo => todo.completed).length
	let notCompleted = total - completed

	return(
		<table className="stats">
			<tbody>
				<tr>
					<th>Всього залишилось:</th>
					<td>{total}</td>
				</tr>
				<tr>
					<th>Виконано:</th>
					<td>{completed}</td>
				</tr>
				<tr>
					<th>Залишилось:</th>
					<td>{notCompleted}</td>
				</tr>
			</tbody>
		</table>
	)
}
Stats.propTypes ={
	todos: React.PropTypes.array.isRequired
}
export default Stats