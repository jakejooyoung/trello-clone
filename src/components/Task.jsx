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
  handleChange(event){
    const obj={};
    obj[event.target.name]=event.target.value;
    this.setState(obj);
    console.log(this.state.title);
  }
  collapse(){
    if (!this.state.title&&!this.state.description){
      if (typeof this.props.onOutfocus === 'function') {
        this.props.onOutfocus(this.props.task);
      }
    } else if (this.state.id!=='placeholder'){
      const url='api/task/';
      const init = {  
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(this.state),
      } 
      const req = new Request(url, init);
      fetch(req)
        .then(res => {
          if (res.status >= 400) {
            throw new Error("Bad response from server");
          }
          return res.json();
        })
        .then(json=> {
          this.setState({id:json.id});
        })
        .catch(function(err){
          console.log("ERROR! " + err)
        });
    }
  }
  render() {
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
    const taskForm=(
      <div className="task">
          <div className="title"> 
            <div className="vertMid">
              <div className="flex">
                <input name="title"
                  value={this.state.title}
                  placeholder="What's next?"
                  autoFocus
                  onChange={(e)=> this.handleChange(e)} 
                  onBlur={this.collapse}/>
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
    return (this.props.task.id==="placeholder"?taskForm:task)
  }
}