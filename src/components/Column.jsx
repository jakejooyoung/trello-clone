import React from "react";
import Task from "./Task.jsx"

export default class Column extends React.Component {
  // Column has Tasks
  constructor(props) {
    super(props);
    this.state = {
      tasks:[],
    }
  }

  componentDidMount(event) {
    // Fetch all Tasks for Column
    const url = 'api/columns/'+this.props.columnId+'/tasks';
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
      .then(json => this.setState({ 'tasks' : json, }))
      .catch(err => console.log("ERROR! " + err ))
  }

  render() {
    // Column-view contains Tasks
    const column=this.props;
    const { tasks }=this.state;

    return (
    	<div style={{'color':'red'}}>
        <div> Column id: {column.columnId} </div>
        <div> Column title: {column.title} </div>
        <div> Column description: {column.description} </div>
        {
          tasks.map(task=>
            <Task className="task" key={task.id} taskId={task.id}/>
          )
        }
      </div>
    );
  }
}