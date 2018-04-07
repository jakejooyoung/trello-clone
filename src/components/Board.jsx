import React from "react";
import Column from "./Column.jsx"

export default class Board extends React.Component {
  // Board has Columns
  constructor(props) {
    super(props);
    this.state={
      columns:[],
      newColumnTitle:"",
    }
  }
    
  // Fetches data and initializes list of columns
  componentDidMount(event) {

    //

    const url = 'api/boards/'+this.props.board.id+'/columns';
    const init = {  
      method : 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    }
    const req = new Request(url, init);

    //

    fetch(req)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(json => this.setState({ 'columns' : json, }))
      .catch(err => console.log("ERROR! " + err ))

  }

  // Sends a POST request to save the new column,
  // and then updates state
  saveColumn(e) {
    if (this.state.newColumnTitle){
      const url='api/columns/';
      const init = {  
        method : 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({title:this.state.newColumnTitle,boardId:this.props.board.id}),
      };
      const req = new Request(url, init);

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
            columns:[...prevState.columns,json],
            newColumnTitle:"",
          }));
        })
        .catch(function(err){
          console.log("ERROR! " + err)
        });
    }
  } 

  handleInput(event){
    const obj={};
    obj[event.target.name]=event.target.value;
    this.setState(obj);
  }

  // Board-view contains list of Columns with a given boardId
  // and a form for creating a new Column 
  render() {
    const board=this.props.board;
    const { columns }=this.state;
    const placeholder={ 
      id:'placeholder',
      newColumnTitle:'',
      boardId:board.id,
    }

    // List of Columns
    const columnsByBoard=columns.map(column=>
      <Column 
        key={column.id}
        column={column}
        boardId={board.id}/>
    )

    // Form for a POST request
    const placeholderColumn=(
      <div className="columnContainer placeholderColumn">
        <div className={"column"}>
          <div className="title"> 
          <div className="vertMid">
            <input id="newColumnTitle"
              name="newColumnTitle"
              placeholder="Enter Column Name"
              value={this.state.newColumnTitle}
              onChange={(e)=> this.handleInput(e)} autoFocus/>
            </div>
            <div className="addButton columnAdd" 
              onClick={(e)=>this.saveColumn(e)}> Create
            </div>
          </div>
        </div>
      </div>
    )

    return (
    	<div className="board">
        {columnsByBoard}
        {placeholderColumn}
      </div>
    );
  }
}