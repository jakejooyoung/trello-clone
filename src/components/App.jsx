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
			newBoardDescription:'',
		}
	}

	/*
	/  Our /users route hasn't been implemented yet so let us 
	/  assume we're signed in as user with id: 1 for now.
	/  All routes other than /users require a parent param so 
	/  This won't work without a userId.
  */
	componentDidMount() {

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

  // Sends a POST request to save the new board,
  // and then updates state
  handleSubmit(userId,event) {
  	event.preventDefault();

    const newBoard={
    	title:this.state.newBoardName,
    	description:this.state.newBoardDescription,
    	userId:userId,
    }
  	const url='api/boards/';
	  const init = {  
	  	method : 'POST',
	  	headers: {
		    Accept: 'application/json',
		    'Content-Type': 'application/json',
		  },
	    body:JSON.stringify(newBoard),
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
      	this.setState(prevState => ({
				  boards: [...prevState.boards, json],
				  selectedId: json.id,
				  newBoardName:"",
				  newBoardDescription:""
				}))
      })
      .catch(function(err){
        console.log("ERROR! " + err)
      });

  }

  handleClick(boardId){
  	this.setState({ 'selectedId' : boardId, })
  }

  handleChange(event) {
  	let obj={};
  	obj[event.target.name]=event.target.value;
    this.setState(obj);
  }


  /* 
	/  App-view contains list of Boards for the given userId,
  /  and a form for creating a new Board.
  /  Most importantly renders the selected <Board>
  */
	render() {
		let { boards }=this.state;
		let userId=this.state.userId;
		let selectedId=this.state.selectedId;
		const getClassName=(a,b)=>"boardPreview "+(a===b?"selected":"");

		return (
			<div className='app' style={{'backgroundColor':'grey'}}>
				<div className="leftMenuContainer">
					<div className="boardsList">		
						{ boards.map(board=>{
								return <div 
									key={board.id} 
									className={getClassName(board.id,selectedId)}
									onClick={(e)=>this.handleClick(board.id,e)}>
					        <a>{board.title}</a>
				      	</div>
							})
						}
					</div>	
					<div className="formContainer">
						<form 
							className="boardForm"
							onSubmit={this.props.onSubmit} 
							method="POST">
							<input 
								name="newBoardName"
								value={this.state.newBoardName}
								placeholder="Enter a new board name"
								onChange={(e)=>this.handleChange(e)}/>
							<input 
								name="newBoardDescription"
								value={this.state.newBoardDescription}
								placeholder="Describe the board"
								onChange={(e)=>this.handleChange(e)}/>
							<button 
								type="submit" 
								value="Submit" 
								name="boardSubmit" 
								onClick={(e)=>this.handleSubmit(userId,e)}> 
								Create New Board
							</button>
						</form>
					</div>
				</div>
				<div className="boardContainer" style={{"background":"white"}}>
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


