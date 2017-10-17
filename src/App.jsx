import React from 'react'
import ReactDOM from 'react-dom'

import todos from './todos'
import Header from './components/Header'
import Todo from './components/Todo'
import Form from './components/Form'

import fetch from 'isomorphic-fetch'
import 'es6-promise'
import axios from 'axios'

class App extends React.Component {
	constructor(props) {
		super(props)
		
			this.state = {
				todos : []
			}
			
			this.handleDelete = this.handleDelete.bind(this)
			this.handleAdd = this.handleAdd.bind(this)
			this.handleEdit = this.handleEdit.bind(this)
			this.handleToggle =  this.handleToggle.bind(this)
			this.handleError = this.handleError.bind(this)
		}

		componentDidMount() {
			axios.get('/api/todos')
				.then(response => response.data)
				.then(todos => this.setState({ todos }))
				.catch(this.handleError)
		}

		handleAdd(title){
			axios.post('/api/todos', { title: title })
					.then(response => response.data)
					.then(todo => {
						const todos = [...this.state.todos, todo]
						
						this.setState({ todos })
					})
					.catch( this.handleError )
		}

		handleDelete(id){
			axios.delete(`/api/todos/${id}`)
				.them(()=> {
					
					const todos = this.state.todos.filter(todo=>todo.id !== id)
					
					this.setState({todos})
				})
				.catch( this.handleError )
			
		}

		handleToggle( id ){
			axios.patch(`/api/todos/${id}`)
				.then(response => {
					const todos = this.state.todos.map(todo =>{
						if(todo.id === id){
							todo = response.data
						}

						return todo
					})

					this.setState({ todos })
				})
					.catch(this.handleError)
		}

		handleEdit(id,title){
			let todos = this.state.todos.map(todo => {
				if(todo.id === id){
					todo.title = title
				}

				return todo
			})

			this.setState({ todos })
		}

		handleError(error){
			console.error(error)
		}

		render() {
			return(
				<main>
					
					<Header  title={this.props.title} todos={this.state.todos} />

					<section className="todo-list">
						{this.state.todos.map(todo => 
							<Todo 
								key={todo.id}
								id={todo.id}
								title={todo.title} 
								completed={todo.completed} 
								key={todo.id} 
								onStatusChange={this.handleToggle}
								onDelete={this.handleDelete}
								onEdit={this.handleEdit}/>)
						}	
					</section>
					<Form onAdd={this.handleAdd}/>
				</main>
			)
		}
}

App.propTypes = {
	title : React.PropTypes.string,
	initialData : React.PropTypes.arrayOf(React.PropTypes.shape({
		id : React.PropTypes.number.isRequired,
		title: React.PropTypes.string.isRequired,
		completed: React.PropTypes.bool.isRequired
	})).isRequired
}
App.defaultProps ={
	title: 'React Todo'
}
ReactDOM.render(<App  initialData={todos} />,document.getElementById('root'))