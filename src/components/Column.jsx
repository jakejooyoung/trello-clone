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
    this.addTask = this.addTask.bind(this)
  }

  addTask() {
    const taskPlaceholder={ 
      id:'placeholder',
      title:'Enter a title for this task',
      description:'What is this task about?'
    }
    this.setState(prevState=>({
      tasks:[...prevState.tasks,taskPlaceholder]
    }));
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

  render() {
    // Column-view contains Tasks
    const column=this.props.column;
    const title=(column)?column.title:"+";

    const tasks = this.state.tasks.map( (task,i) => (
      <Task key={task.id.toString()} className="task" task={task}/>
    ));
    const reverse=tasks.reverse();

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
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={true}
            transitionLeave={true}>
            {reverse}
          </ReactCSSTransitionGroup>  
        </div>
      </div>
    );
  }
}