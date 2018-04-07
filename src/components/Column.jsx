import React from "react";
import Task from "./Task.jsx"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 

export default class Column extends React.Component {
  // Column has Tasks
  constructor(props) {
    super(props);
    this.state = {
      tasks:[],
      showForm:false,
      newTaskTitle:"",
      newTaskDescription:""
    }
  }

  // fetch data and initialize tasks
  componentDidMount(event) {
    if (this.props.column){
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
  }

  saveTask() {
    const form={
      title:this.state.newTaskTitle,
      description:this.state.newTaskDescription,
      columnId:this.props.column.id,
      boardId:this.props.boardId,
      userId:1,
    };
    const url='api/tasks/';
    const init = {  
      method : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(form),
    };
    const req = new Request(url, init);
    // Submit the POST request then setState using returned db id.
    fetch(req)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(json=> {
        console.log(json.id);
        this.setState(prevState=>({
          tasks:[...prevState.tasks,json],
          newTaskTitle:"",
          newTaskDescription:"",
          showForm:false
        }));
      })
      .catch(function(err){
        console.log("ERROR! " + err)
      });
  }   

  // validate input
  validateForm(event){
    if (event.target.name==="title"&&this.state.newTaskTitle&&!this.state.newTaskDescription){
      document.getElementById("newTaskDescription").focus();
    }
    if (event.target.name==="description"&&this.state.newTaskDescription&&!this.state.newTaskTitle){
      document.getElementById("newTaskTitle").focus();
    }
    if (event.target.name==="title"&&!this.state.newTaskTitle && !this.state.newTaskDescription){
      this.hideForm();
    }
    if (this.state.newTaskTitle&&this.state.newTaskDescription){
      this.saveTask();
    }
  }

  handleInput(event){
    console.log(event.target.name+"dfdf");
    const obj={};
    obj[event.target.name]=event.target.value;
    this.setState(obj);
  }

  hideForm(){
    this.setState({showForm:false})
  }
  showForm(e){
    this.setState({showForm:true})
  }
  collapse(){

  }
  render() {
    // Column-view contains Tasks
    const column=this.props.column;
    const boardId=this.props.boardId;
    const title=(column)?column.title:"+";


    // Format array of tasks
    const tasks = this.state.tasks.map( (task,i) => (
      <Task 
        key={task.id.toString()} 
        className="task" 
        columnId={column.id} 
        boardId={boardId}
        task={task}/>
    ));
    const tasksReversed=tasks.reverse();


    // HTML form snippet new task input fields
    const placeholderTask=(
      <div className="task">
        <div className="title"> 
          <div className="vertMid">
            <div className="flex">
              <input id="newTaskTitle"
                name="newTaskTitle"
                placeholder="What's next?"
                value={this.state.newTaskTitle}
                onChange={(e)=> this.handleInput(e)} 
                onBlur={(e)=> this.validateForm(e)} autoFocus/>
            </div>
          </div>
        </div>
        <div className="description"> 
          <div className="flex">
            <input id="newTaskDescription"
              name="newTaskDescription"
              placeholder="What should you remember about this task?"
              value={this.state.newTaskDescription}
              onChange={(e)=> this.handleInput(e)} 
              onBlur={(e)=> this.validateForm(e)}/>
          </div>
        </div>
      </div>
    )

    // RETURN
    return (
    	<div className="columnContainer">
        <div className={"column"}>
          <div className="title"> 
            <div 
              className="addButton addTask" 
              onClick={(e)=>this.showForm(e)}> 
              +
            </div>
            <div className="vertMid">
              {column.title}
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName="taskTransitions"
            transitionAppear={false}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
            transitionEnter={true}
            transitionLeave={false}>
            { (this.state.showForm ? placeholderTask : "") }
            {tasksReversed}
          </ReactCSSTransitionGroup>  
        </div>
      </div>
    );
  }
}