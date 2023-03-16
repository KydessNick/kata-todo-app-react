import React, { Component } from 'react';

import './New-task-form.css';

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
    const { onItemAdded, value } = this.props;
    if (e.keyCode === 13) {
      onItemAdded(value);
    }
  };

  render() {
    const { value, newTaskChangeHandler } = this.props;
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={newTaskChangeHandler}
        onKeyDown={this.onEnterPress}
      />
    );
  }
}

NewTaskForm.propTypes = {
  value: PropTypes.string,
  newTaskChangeHandler: PropTypes.func.isRequired,
  onItemAdded: PropTypes.func.isRequired,
};

NewTaskForm.defaultProps = {
  value: '',
};
