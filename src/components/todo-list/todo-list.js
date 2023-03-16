import TodoListItem from '../todo-list-item/todo-list-item';
import EditItem from '../edit-item/edit-item';
import React from 'react';

import './todo-list.css';

import PropTypes from 'prop-types';

// export default class TodoList extends Component{

//     render(){
//         const {todos, onDeleted, onDone, onEditTask} = this.props

//         const elements = todos.map((item)=>{
//             const {id, ...restItems} = item;

//               return (
//                   <li key={id} className="list-group-item">
//                       <TodoListItem
//                       {...restItems}
//                       // onDeleted ={()=>console.log('Deleted')}
//                       onDeleted ={()=> onDeleted(id)}
//                       onDone = {()=> onDone(id)}
//                       onEditTask={onEditTask}
//                           // label={item.label}
//                           // mapped={item.mapped}
//                           // important={item.important}
//                           />
//                   </li>
//               )
//           })

//         return(
//             <ul className='todo-list'>
//                 {elements}
//             </ul>
//         )
//     }
// }

// function TodoList({ todos, filter, onDeleted, onDone, onEditItem }) {
//   const items = todos.reduce((acc, task) => {
//     let classList = ''
//     const { label,  id, editing, completed } = task
//     let willRender = true
//     if (task.completed) {
//       classList += ' completed'
//     }
//     if (task.editing) {
//       classList += ' editing'
//     }

//     switch (filter) {
//       case 'Active':
//         if (task.completed) willRender = false
//         break
//       case 'Completed':
//         if (!task.completed) willRender = false
//         break
//       default:
//     }

//     if (willRender) {
//       acc.push(
//         <li className={classList} key={task.id}>
//           <EditItem description={task.label}
//                     id={task.id}
//                     onEditTask={onEditItem} />
//           <TodoListItem
//             description={label}
//             // created={created}
//             id={id}
//             editing={editing}
//             completed={completed}
//             onDeleteTask={onDeleted}
//             onCompleteTask={onDone}
//             onEditTask={onEditItem}
//           />
//         </li>
//       )
//     }

//     return acc
//   }, [])

//   return <ul className="todo-list">{items}</ul>
// }

// export default TodoList

function TodoList({ tasks, renderMode, onDeleteTask, onCompleteTask, onEditTask }) {
  const items = tasks.reduce((acc, task) => {
    let classList = '';
    const { description, created, id, editing, completed } = task;
    let willRender = true;
    if (task.completed) {
      classList += ' completed';
    }
    if (task.editing) {
      classList += ' editing';
    }

    switch (renderMode) {
      case 'Active':
        if (task.completed) willRender = false;
        break;
      case 'Completed':
        if (!task.completed) willRender = false;
        break;
      default:
    }

    if (willRender) {
      acc.push(
        <li className={classList} key={task.id}>
          <EditItem description={task.description} id={task.id} onEditTask={onEditTask} />
          <TodoListItem
            description={description}
            created={created}
            id={id}
            editing={editing}
            completed={completed}
            onDeleteTask={onDeleteTask}
            onCompleteTask={onCompleteTask}
            onEditTask={onEditTask}
          />
        </li>
      );
    }

    return acc;
  }, []);

  return <ul className="todo-list">{items}</ul>;
}

export default TodoList;

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      editing: PropTypes.bool.isRequired,
    })
  ).isRequired,
  renderMode: PropTypes.oneOf(['All', 'Active', 'Completed']),
  onCompleteTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  renderMode: 'All',
};
