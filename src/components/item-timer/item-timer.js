import React, { Component } from 'react';

import './item-timer.css';

// function ItemTimer({ onPlay, onPause, timeInSec }) {
//   const formatTime = (timeState) => {
//     const getPadTime = (time) => time.toString().padStart(2, 0);
//     const minutes = getPadTime(Math.floor(timeState / 60));
//     const seconds = timeState - minutes * 60;
//     return `${minutes}: ${seconds}`;
//   };
//   const formattedTime = formatTime(formatTime(timeInSec));
//   return (
//     <span className="timer-container">
//       <button type="button" className="icon icon-play" aria-label="play" onClick={onPlay} />
//       <button type="button" className="icon icon-pause" aria-label="Pause" onClick={onPause} />
//       <div className="timer">{formattedTime}</div>
//     </span>
//   );
// }

// export default ItemTimer;

export default class ItemTimer extends Component {
  // eslint-disable-next-line class-methods-use-this
  formatTime = (timeState) => {
    // console.log(timeState);
    const getPadTime = (time) => time.toString().padStart(2, '0');
    const minutes = getPadTime(Math.floor(timeState / 60));
    // console.log(minutes);

    const seconds = getPadTime(timeState - minutes * 60);
    // console.log(seconds);

    return `${minutes}:${seconds}`;
  };

  render() {
    const { onPlay, onPause, timeInSec } = this.props;
    // console.log(timeInSec);
    const formattedTime = this.formatTime(timeInSec);
    // console.log(formattedTime);

    return (
      <span className="timer-container">
        <button type="button" className="icon icon-play" aria-label="play" onClick={onPlay} />
        <button type="button" className="icon icon-pause" aria-label="pause" onClick={onPause} />
        <div className="timer">{formattedTime}</div>
      </span>
    );
  }
}
