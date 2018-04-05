import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			boards:[],
			selectedId:0,
		}
	}
	componentDidMount() {
		// Let's assume we're signed in as user with id: 3 for now.
		// Get all boards for user 3
	  const url='api/users/1/boards/';
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
      .then(json => 
      	this.setState({ 
      		'boards': json,
      		'selectedId': json[0].id
      	}))
      .catch(err => console.log("ERROR! " + err ))

  }
  handleClick(boardId){
  	this.setState({ 'selectedId' : boardId, })
  }
  // Show list of Boards for user.
	// On selection, mount and fetch data to render board view for selected boardId.
	render() {
		const { boards }=this.state;
		console.log(boards[0]);
		return (
			<div className='app row' style={{'backgroundColor':'grey'}}>
				<div className="boardsList">		
					{ boards.map(board=>
							<div 
								key={board.id} 
								className="boardPreview"
								onClick={(e)=>this.handleClick(board.id,e)}>
				        <a>{board.title}</a>
			      	</div>
						)}
				</div>	
				<div className="boardContainer">
					{ boards.map(board=>
							(board.id===this.state.selectedId) ?
								<Board 
									key={board.id}
									boardId={board.id}
									board={board}/>:
								""
						)}
	      </div>
			</div>
		);
	}
}


