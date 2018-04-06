import React from "react";
import Task from "./Task.jsx"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

export default class Column extends React.Component {
  // Column has Tasks
  constructor(props) {
    super(props);
    this.state = {
      tasks:[],
    }
    this.addTask = this.addTask.bind(this);
    this.removeTask=this.removeTask.bind(this);
  }

  componentDidMount(event) {
    // If a column object was passed in as a prop
    if (this.props.column){
      // Fetch all Tasks for Column
      const url = 'api/columns/'+this.props.column.id+'/tasks';
      const init = {  
        method : 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }),
      }
      const req = new Request(url, init);
      fetch(req)
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          console.log(res);
          return res.json();
        })
        .then(json => this.setState({ tasks : json, }))
        .catch(err => console.log("ERROR! " + err ))
    }
    // If not, render just the placeholder ui.
  }
  // Animate the adding of a new task card.
  addTask() {
    const taskPlaceholder={ 
      id:'placeholder',
      title:'',
      description:'',
      columnId:this.props.column.id,
      boardId:this.props.boardId,
    }
    this.setState(prevState=>({
      tasks:[...prevState.tasks,taskPlaceholder]
    }));
  }
  // Animate the removing of an empty card onBlur from child function.
  removeTask(task) {
    // console.log(this.state);
    // console.log(task);
    const tasks=this.state.tasks;
    this.setState({tasks: tasks.filter(function(t) { 
        return t !== task;
    })});
  }

  render() {
    // Column-view contains Tasks
    const column=this.props.column;
    const boardId=this.props.boardId;
    const title=(column)?column.title:"+";

    const tasks = this.state.tasks.map( (task,i) => (
      <Task 
        key={task.id.toString()} 
        className="task" 
        columnId={column.id} 
        boardId={boardId}
        onOutfocus={this.removeTask}
        task={task}/>
    ));

    const tasksReversed=tasks.reverse();

    return (
    	<div className="columnContainer">
        <div className={"column "+(column?"":"add")}>
          <div className="title"> 
            <div className="addButton" onClick={this.addTask}>
              +
            </div>
            <div className="vertMid">
              {title}
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionAppear={false}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionEnter={true}
            transitionLeave={true}>
            {tasksReversed}
          </ReactCSSTransitionGroup>  
        </div>
      </div>
    );
  }
}