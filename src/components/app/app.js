import NewTaskForm from '../new-task-form/New-task-form';
import TodoList from '../todo-list';
import Footer from '../footer/footer';
import React, { Component } from 'react';

import './app.css';

// export default class App extends Component{
//     initialId = 100;

//     state = {
//         todoData :[
//           this.createItem('create app'),
//           this.createItem('make editing')
//         ],
//         filter : 'all',
//         formText : ''
//     }

//     createItem(label){
//         return{
//             label,
//             dateStamp : new Date(),
//             completed : false,
//             editing: false,
//             id : ++this.initialId,
//         }
//     }

//     deleteItem = (id) =>{
//         this.setState(({todoData})=>{
//             const idx = todoData.findIndex((el)=>el.id === id)
//             console.log(idx);

//             const before = todoData.slice(0, idx)
//             const after = todoData.slice(idx + 1)
//             const newArr = [...before, ...after]

//             return{
//                 todoData : newArr
//             }
//         })
//     }

//     deleteAllDone = () =>{
//       const {todoData} = this.state;
//       todoData.forEach((todoItem)=>{
//         if(todoData.completed) this.deleteItem(todoItem.id)
//       })
//     }

//     onAddItem = (text) =>{
//         console.log(text + 'горнило циркумфлекс');

//            const newItem = this.createItem(text)

//           this.setState(({todoData})=>({
//             todoData : [...todoData, newItem],

//           }))

//     }

//     toggleProperty(arr, id, prop){
//         const idx = arr.findIndex((el) => el.id === id)

//         const oldItem = arr[idx];
//         const value = !oldItem[prop];

//         const item = { ...arr[idx], [prop]: value } ;
//         return [
//           ...arr.slice(0, idx),
//           item,
//           ...arr.slice(idx + 1)
//           ];
//     }

//     onToggleDone =(id)=>{
//         console.log('Toggle Доне/ completed', id)

//         this.setState(({todoData})=>{
//         return {
//           todoData : this.toggleProperty(todoData, id, 'completed')
//          }
//         })
//       }

//       editTask = (id, label) =>{
//         const {todoData} = this.state;
//         const idx = todoData.findIndex((el)=>el.id = id)
//         const oldItem = todoData[idx];
//         const newItem = {...oldItem, editing:!oldItem.editing, label}
//         const newArr = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx+1)]
//         this.setState(()=>({
//           todoData : newArr,
//         }))
//       }

//     onFilterChange = (filter)=> {
//         this.setState({filter})
//       }

//     filter(items, filter){
//         switch(filter){
//           case 'all':
//             return items;
//           case 'active':
//             return items.filter((item)=> !item.completed);
//           case 'completed':
//             return items.filter((item)=> item.completed);
//           default:
//            return items;
//         }
//       }

//       // function clearAll

//       render(){
//         const {todoData, filter} =this.state;

//         const itemsLeft = todoData.reduce((acc, task) => {
//           if (!task.completed) acc++
//           return acc
//         }, 0)

//         return(
//           <section className='todoapp'>
//             <header className='header'/>
//               <h1>todos</h1>
//             <NewTaskForm
//             onAddElement = {this.onAddItem}/>
//             <section className='main'>
//               <TodoList
//                 todos={todoData}
//                 filter={filter}
//                 onEditItem = {this.editTask}
//                 onDeleted = {this.deleteItem}
//                 onDone = {this.onToggleDone}
//               />
//               <Footer
//                 itemsLeft = {itemsLeft}
//                 onDeleteAllDone = {this.deleteAllDone}
//                 filter = {filter}
//                />
//             </section>
//           </section>
//         )
//       }

// }

export default class App extends Component {
  static toggleProperty = (arr, id, propName, value = !arr[arr.findIndex((item) => item.id === id)][propName]) => {
    const i = arr.findIndex((el) => el.id === id);
    const oldItem = arr[i];
    const newItem = { ...oldItem, [propName]: value };
    // const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, i), newItem, ...arr.slice(i + 1)];
  };

  idCounter = 0;

  currentTaskFilter = ['All', 'Active', 'Completed'];

  state = {
    tasks: [this.createTask('create app', '61'), this.createTask('make editing', 65)],
    renderMode: 'All',
    // description: '',
    // minutes: '',
    // seconds: '',
  };

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // eslint-disable-next-line class-methods-use-this
  timeGet = (minutes, seconds) => +minutes * 60 + +seconds;

  playBtn = (id) => {
    this.setState(({ tasks }) => ({ tasks: App.toggleProperty(tasks, id, 'isTimerOn', true) }));
  };

  pauseBtn = (id) => {
    this.setState(({ tasks }) => ({ tasks: App.toggleProperty(tasks, id, 'isTimerOn', false) }));
  };

  updateTime = () => {
    this.interval = setInterval(() => {
      this.setState(({ tasks }) => {
        const newArr = tasks.map((task) => {
          if (task.timeInSec === 0 || task.done) {
            return task;
          }
          if (task.isTimerOn) {
            // eslint-disable-next-line no-param-reassign
            task.timeInSec -= 1;
          }
          return task;
        });
        return {
          task: newArr,
        };
      });
    }, 1000);
  };

  deleteTask = (id) => {
    this.setState(({ tasks }) => {
      const i = tasks.findIndex((el) => el.id === id);
      const newArray = [...tasks.slice(0, i), ...tasks.slice(i + 1)];

      return {
        tasks: newArray,
      };
    });
  };

  completeTask = (id) => {
    this.setState(({ tasks }) => ({
      tasks: App.toggleProperty(tasks, id, 'completed'),
    }));
  };

  editTask = (id, description) => {
    const { tasks } = this.state;
    const i = tasks.findIndex((el) => el.id === id);
    const oldItem = tasks[i];
    const newItem = { ...oldItem, editing: !oldItem.editing, description };
    const newArr = [...tasks.slice(0, i), newItem, ...tasks.slice(i + 1)];
    this.setState(() => ({
      tasks: newArr,
    }));
  };

  addTask = (description, minutes, seconds) => {
    const timeInSec = this.timeGet(minutes, seconds);
    console.log(typeof timeInSec);
    const newItem = this.createTask(description, timeInSec);
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem],
      description: '',
      minutes: '',
      seconds: '',
    }));
  };

  setRenderMode = (mode) => {
    this.setState(() => ({
      renderMode: mode,
    }));
  };

  deleteAllComplete = () => {
    const { tasks } = this.state;
    tasks.forEach((task) => {
      if (task.completed) this.deleteTask(task.id);
    });
  };

  newTaskChangeHandler = (e) => {
    const { target } = e;
    const { name, value } = target;
    console.log(name, value);
    this.setState({
      [name]: value,
    });
  };
  // newTaskChangeHandler = (e) => {
  //   console.log(e.target.name);
  //   console.log(e);
  //   const a = e.target.name;
  //   console.log(Array.isArray(a));
  //   this.setState({
  //     newTaskFormText: e.target.value,
  //   });
  // };

  createTask(description, timeInSec) {
    console.log(timeInSec); // суммарное количество времени Number
    return {
      description,
      created: new Date(),
      id: this.idCounter++,
      completed: false,
      editing: false,
      timeInSec,
      isTimerOn: false,
    };
  }

  render() {
    // const { tasks, renderMode, renderOptions(currentTaskFilter), description, minutes, seconds } = this.state;
    const { tasks, renderMode, description, minutes, seconds } = this.state;
    const itemsLeft = tasks.reduce((acc, task) => {
      if (!task.completed) acc++;
      return acc;
    }, 0);
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm
            // value={newTaskFormText}
            newTaskChangeHandler={this.newTaskChangeHandler}
            onItemAdded={this.addTask}
            description={description}
            minutes={minutes}
            seconds={seconds}
          />
        </header>

        <section className="main">
          <TodoList
            tasks={tasks}
            renderMode={renderMode}
            onCompleteTask={this.completeTask}
            onDeleteTask={this.deleteTask}
            onEditTask={this.editTask}
            onPlay={this.playBtn}
            onPause={this.pauseBtn}
            // timeInSec={this.timeGet}
          />
          <Footer
            itemsLeft={itemsLeft}
            onRenderModeChange={this.setRenderMode}
            onDeleteAllComplete={this.deleteAllComplete}
            renderMode={renderMode}
            currentTaskFilter={this.currentTaskFilter}
          />
        </section>
      </section>
    );
  }
}
