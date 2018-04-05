import React from "react";

export default class Task extends React.Component {
  // Column has Tasks
  constructor(props) {
    super(props);
  }
  render() {
  	const task=this.props.task;
    return (
    	<div className="task">
          <div className="title"> 
            <div className="vertMid">
              {task.title} 
            </div>
          </div>
          <div className="description"> 
            {task.description} 
          </div>
      </div>
    );
  }
}