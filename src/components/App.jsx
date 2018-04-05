import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			userId:1,
			boards:[],
			selectedId:0,
			newBoardName:'',
		}
	}
	componentDidMount() {
		// Let's assume we're signed in as user with id: 3 for now.
		// Get all boards for user 3
	  const url='api/users/'+this.state.userId+'/boards/';
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

  handleSubmit(userId,event) {
  	event.preventDefault();
  	const target = event.target;
    const boardName = this.state.newBoardName;

  	const url='api/boards/';
	  const init = {  
	  	method : 'POST',
	  	headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
	    body:JSON.stringify({
	    	title:boardName,
	    	description:"Default description for now",
	    	userId:userId,
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
      .then(json =>{
      	console.log(json);
      })
      .catch(function(err){
        console.log("ERROR! " + err)
      });
  }
  handleClick(boardId){
  	this.setState({ 'selectedId' : boardId, })
  }
  handleChange(event) {
    this.setState({'newBoardName': event.target.value});
  }

  // "boardsList" shows list of Boards for user.
  // "boardForm" lets users create new boards. 
	// "<Board>" fetches all columns and tasks related to the selected boardId
	render() {
		const { boards }=this.state;
		const userId=this.state.userId;
		const selectedId=this.state.selectedId;
		const getClassName=(a,b)=>"boardPreview "+(a===b?"selected":"");
		console.log("HELLO");
		return (
			<div className='app' style={{'backgroundColor':'grey'}}>
				<div className="boardsList">		
					{ boards.map(board=>
							<div 
								key={board.id} 
								className={getClassName(board.id,selectedId)}
								onClick={(e)=>this.handleClick(board.id,e)}>
				        <a>{board.title}</a>
			      	</div>
						)}
					<form 
						className="boardForm"
						onSubmit={this.props.onSubmit} 
						method="POST">
						<input 
							name="boardName"
							placeholder="Enter a new board name"
							onChange={(e)=>this.handleChange(e)}/>
						<button 
							type="submit" 
							value="Submit" 
							name="createBoard" 
							onClick={(e)=>this.handleSubmit(userId,e)}/>
					</form>
				</div>	

				<div className="boardContainer">
					{ boards.map(board=>
							(board.id===selectedId) ?
								<Board 
									key={board.id}
									board={board}/>:
								""
						)}
	      </div>
			</div>
		);
	}
}


