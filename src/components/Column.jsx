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
      title:"",
      description:""
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
      title:this.state.title,
      description:this.state.description,
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
          title:"",
          description:"",
          showForm:false
        }));
      })
      .catch(function(err){
        console.log("ERROR! " + err)
      });
  }   

  // validate input
  validateForm(event){
    if (event.target.name==="title"&&this.state.title&&!this.state.description){
      document.getElementById("description").focus();
    }
    if (event.target.name==="description"&&this.state.description&&!this.state.title){
      document.getElementById("title").focus();
    }
    if (event.target.name==="title"&&!this.state.title && !this.state.description){
      this.hideForm();
    }
    if (this.state.title&&this.state.description){
      this.saveTask();
    }
  }

  handleInput(event){
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


    // Html snippet for adding a new task
    const placeholderTask=(
      <div className="task">
        <div className="title"> 
          <div className="vertMid">
            <div className="flex">
              <input id="title"
                name="title"
                placeholder="What's next?"
                value={this.state.title}
                onChange={(e)=> this.handleInput(e)} 
                onBlur={(e)=> this.validateForm(e)} autoFocus/>
            </div>
          </div>
        </div>
        <div className="description"> 
          <div className="flex">
            <input id="description"
              name="description"
              placeholder="What should you remember about this task?"
              value={this.state.description}
              onChange={(e)=> this.handleInput(e)} 
              onBlur={(e)=> this.validateForm(e)}/>
          </div>
        </div>
      </div>
    )


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