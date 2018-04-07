import React from "react";
import Column from "./Column.jsx"

export default class Board extends React.Component {
  // Board has Columns
  constructor(props) {
    super(props);
    this.state={
      columns:[],
    }
  }
    
  // Fetch Columns for Board once the board view mounts
  componentDidMount(event) {
    const url = 'api/boards/'+this.props.board.id+'/columns';
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
        return res.json();
      })
      .then(json => this.setState({ 'columns' : json, }))
      .catch(err => console.log("ERROR! " + err ))
  }

  render() {
    // Board-view contains Columns
    const board=this.props.board;
    const { columns }=this.state;
    const placeholder={ 
      id:'placeholder',
      title:'',
      description:'',
      boardId:board.id,
    }
    // Get columns by board id. 
    // Data fetched in componentDidMount.
    const columnsByBoard=columns.map(column=>
      <Column 
        key={column.id}
        column={column}
        boardId={board.id}/>
    )
    const placeholderColumn=(
      <Column 
        key="placeholder"
        column={placeholder}
        boardId={board.id}/>
    )
    return (
    	<div className="board">
        {columnsByBoard}
        {placeholderColumn}
      </div>
    );
  }
}