import React, { Component } from 'react';

import './task-filter.css';

import PropTypes from 'prop-types';

// export default class TaskFilter extends Component{

//     render(){
//         return(
//             <p>Abobubs</p>
//         )
//     }
// }

export default class TaskFilter extends Component {
  key = 0;

  render() {
    const { renderOptions, renderMode, onRenderModeChange } = this.props;

    const items = renderOptions.map((option) => (
      <li key={this.key++}>
        <button
          className={renderMode === option ? 'selected' : ''}
          onClick={() => onRenderModeChange(option)}
          type="button"
        >
          {option}
        </button>
      </li>
    ));

    return <ul className="filters">{items}</ul>;
  }
}

TaskFilter.propTypes = {
  renderMode: PropTypes.oneOf(['All', 'Active', 'Completed']),
  renderOptions: PropTypes.arrayOf(PropTypes.string),
  onRenderModeChange: PropTypes.func.isRequired,
};

TaskFilter.defaultProps = {
  renderMode: 'All',
  renderOptions: ['All', 'Active', 'Completed'],
};
