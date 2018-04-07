import React from "react";

export default class Task extends React.Component {
  // Column has Tasks
  constructor(props) {
    super(props);
    this.state={
      id:'',
      title:'',
      description:'',
      boardId:'',
      columnId:'',
    }
  }

  componentDidMount(event){
    const { task }=this.props;
    this.setState({
      title:task.title,
      description:task.description,
      id:task.id,
      boardId:task.boardId,
      columnId:task.columnId,
    });
  }

  // Input fields updating state properties
  // handleChange(event){
  //   const obj={};
  //   obj[event.target.name]=event.target.value;
  //   this.setState(obj);
  //   console.log(this.state.title);
  // }

  // // Use OnBlur to decide when to Save or Discard of the placeholder task card.
  // collapse(){
  //   // If no title or description has been entered and user
  //   // switches away from input field focus, remove the empty placeholder card
  //   if (!this.state.title&&!this.state.description){
  //     if (typeof this.props.onOutfocus === 'function') {
  //       this.props.onOutfocus(this.props.task);
  //     }
  //   } 
  //   // If task.id is still 'placeholder' while title and description have been entered
  //   // then it means we're good to save the new task to the database
  //   if (this.state.id==='placeholder'&&this.state.title&&this.state.description){
  //     // Create object to pass in as body of POST
  //   }
  // }
  render() {
    // A regular "card" for representing a task 
    const task=(
      <div className="task">
          <div className="title"> 
            <div className="vertMid">
              {this.state.title||this.props.task.title}
            </div>
          </div>
          <div className="description"> 
            {this.state.description||this.props.task.description}
          </div>
      </div>
    )
    return (this.state.id==="placeholder"?taskForm:task)
  }
}