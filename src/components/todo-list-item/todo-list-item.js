import React, { Component } from 'react';

// import formatDistanceToNow from "date-fns/formatDistanceToNow";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import './todo-list-item.css';

import PropTypes from 'prop-types';

// export default class TodoListItem extends Component{

//     // onClickedBtn = (e) =>{
//     //     const {label, id, }
//     // }

//     clickHandler = (e) => {
//         const { onEditItem, id, label } = this.props
//         console.log(onEditItem)
//         onEditItem(id, label)
//         setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50)
//       }

//     render(){
//         const {label, completed, id,
//                dateStamp, onDeleted, onDone, } = this.props;

//         const delId = `${id}del`
//         const editId = `${id}edit`

//         return(
//             <div className="view">
//                 <input className="toggle" type="checkbox" checked={completed} onChange={()=> onDone(id)} />

//                 <label>
//                     <span className='description'>{label}</span>
//                     {/* <span className='crated'>{dateStamp}</span> */}
//                 </label>

//                 {/* <button className='icon icon-edit' onClick={this.onClickedBtn}/> */}
//                 <button className='icon icon-edit'
//                         onClick={this.clickHandler}
//                         type="button"
//                         id={editId}/>
//                 <button className='icon icon-destroy'
//                         onClick={onDeleted} />
//             </div>
//         )
//     }
// }

export default class TodoListItem extends Component {
  clickHandler = (e) => {
    const { onEditTask, id, description } = this.props;
    onEditTask(id, description);
    setTimeout(() => e.target.closest('li').querySelector('.edit').focus(), 50);
  };

  render() {
    const { description, created, id, completed, onDeleteTask, onCompleteTask } = this.props;
    const delId = `${id}del`;
    const editId = `${id}edit`;

    return (
      <div className="view">
        <input className="toggle" type="checkbox" checked={!!completed} onChange={() => onCompleteTask(id)} id={id} />

        <label htmlFor={`${id} ${delId} ${editId}`}>
          <span className="description">{description}</span>
          <span className="created">{formatDistanceToNow(created)}</span>
        </label>

        <button className="icon icon-edit" onClick={this.clickHandler} type="button" id={editId} />
        <button className="icon icon-destroy" onClick={() => onDeleteTask(id)} type="button" id={delId} />
      </div>
    );
  }
}

TodoListItem.propTypes = {
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
};
