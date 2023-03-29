import React, { Component } from 'react';

import './New-task-form.css';

// import PropTypes, { func } from 'prop-types';
import PropTypes from 'prop-types';

// export default class NewTaskForm extends Component{

//     state = {
//         label : ''
//     }

//     onLabelChange = (e) =>{
//         console.log(e.target.value)
//         this.setState({
//             label : e.target.value
//         })
//     }

//     onEnterSubmit =(e) =>{
//         if(e.keyCode === 13){
//             this.props.onAddElement(this.state.label)
//             console.log(e.keyCode)
//         }
//         this.setState({
//             label: ' '
//         })
//     }

//     render(){

//         return(
//             <header className='header'>
//                 <h1>todos</h1>
//                 <input className='new-todo'
//                         placeholder='What needs to be done?'
//                         value={this.state.label}
//                         onKeyDown = {this.onEnterSubmit}
//                         onChange = {this.onLabelChange}/>
//             </header>
//         )
//     }
// }

export default class NewTaskForm extends Component {
  onEnterPress = (e) => {
    const { onItemAdded, description, minutes, seconds } = this.props;
    if (e.keyCode === 13) {
      e.preventDefault();
      onItemAdded(description, minutes, seconds);
    }
    return alert('fill the input with text!');
  };

  render() {
    const { newTaskChangeHandler, minutes, seconds, description } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <form className="new-todo-form" onSubmit={this.onEnterPress}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          value={description}
          name="description"
          onChange={newTaskChangeHandler}
          minLength="1"
          maxLength="20"
          required
        />
        <input
          type="text"
          className="new-todo-form__timer"
          value={minutes}
          name="minutes"
          placeholder="Min"
          onChange={newTaskChangeHandler}
          pattern="[0-9]*"
          minLength="1"
          required
        />
        <input
          type="text"
          className="new-todo-form__timer"
          value={seconds}
          name="seconds"
          placeholder="Sec"
          onChange={newTaskChangeHandler}
          pattern="[0-6]{1}[0-9]*"
          minLength="1"
          required
        />
        <button type="submit" aria-label="submission" />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  // value: PropTypes.string,
  newTaskChangeHandler: PropTypes.func.isRequired,
  onItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  // value: '',
};
