import React from "react";

export default class Task extends React.Component {
  // Column has Tasks
  constructor(props) {
    super(props);
  }
  render() {
  	const task=this.props;
    return (
    	<div style={{'color':'blue'}}>
          <div> task id:{task.taskId} </div>
          <div> task title:{task.title} </div>
          <div> task description:{task.description} </div>
      </div>
    );
  }
}