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
        .then(json => this.setState({ 'tasks' : json, }))
        .catch(err => console.log("ERROR! " + err ))
    }
    // If not, render just the placeholder ui.
  }

  render() {
    // Column-view contains Tasks
    const column=this.props.column;
    const { tasks }=this.state;
    const title=(column)?column.title:"+";
    return (
    	<div className="columnContainer">
        <div className={"column "+(column?"":"add")}>
          <div className="title"> 
            <div className="addButton">
              +
            </div>
            <div className="vertMid">
              {title}
            </div>
          </div>
          {
            tasks.map(task=>
              <Task 
                key={task.id}
                className="task" 
                task={task}/>)
          }
        </div>
      </div>
    );
  }
}