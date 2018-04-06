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
    this.collapse=this.collapse.bind(this);
  }

  componentDidMount(event){
    const { task }=this.props;
    this.setState({
      id:task.id,
      boardId:task.boardId,
      columnId:task.columnId,
    });
  }

  // Input fields updating state properties
  handleChange(event){
    const obj={};
    obj[event.target.name]=event.target.value;
    this.setState(obj);
    console.log(this.state.title);
  }

  // Use OnBlur to decide when to Save or Discard of the placeholder task card.
  collapse(){

    // If no title or description has been entered and user
    // switches away from input field focus, remove the empty placeholder card
    if (!this.state.title&&!this.state.description){
      if (typeof this.props.onOutfocus === 'function') {
        this.props.onOutfocus(this.props.task);
      }
    } 

    // If task.id is still 'placeholder' while title and description have been entered
    // then it means we're good to save the new task to the database
    if (this.state.id==='placeholder'&&this.state.title&&this.state.description){

      // Create object to pass in as body of POST
      const newTask=this.state;
      newTask['title']=this.state.title;
      newTask['description']=this.state.description;
      const url='api/tasks/';
      const init = {  
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(newTask),
      } 
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
          this.setState({id:json.id});
          console.log(this.state.id);
        })
        .catch(function(err){
          console.log("ERROR! " + err)
        });
    }
  }
  render() {
    // A regular "card" for representing a task 
    const task=(
      <div className="task">
          <div className="title"> 
            <div className="vertMid">
              {this.props.task.title} 
            </div>
          </div>
          <div className="description"> 
            {this.props.task.description} 
          </div>
      </div>
    )
    // A placeholder "card" for creating new tasks
    const taskForm=(
      <div className="task">
          <div className="title"> 
            <div className="vertMid">
              <div className="flex">
                <input
                  name="title"
                  value={this.state.title}
                  placeholder="What's next?"
                  onChange={(e)=> this.handleChange(e)} 
                  onBlur={this.collapse} autoFocus/>
              </div>
            </div>
          </div>
          <div className="description"> 
            <div className="flex">
              <input name="description"
                  value={this.state.description}
                  placeholder="What should you remember about this task?"
                  onChange={(e)=> this.handleChange(e)} 
                  onBlur={this.collapse}/>
            </div>
          </div>
      </div>
    )
    return (this.state.id==="placeholder"?taskForm:task)
  }
}