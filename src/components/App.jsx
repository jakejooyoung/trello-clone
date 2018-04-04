import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			boards:[],
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
      .then(json =>this.setState({ 'boards' : json, }))
      .catch(err => console.log("ERROR! " + err ))

  }

	render() {
		const { boards }=this.state;
		// Show list of Boards for user.
		// On selection, mount and fetch data to render board view for selected boardId.
		return (
			<div className='app' style={{'backgroundColor':'grey'}}>
				{
					boards.map(board=>
						<div key={board.id}>
							<div className="boardPreview">
								<div>{board.id}</div>
				        <div>{board.title}</div>
				        <div>{board.description}</div>
				      </div>
			        {(board.id===1)?
			        	<Board boardId={board.id} title={board.title}/>:''}
			      </div>
					)
				}
			</div>
		);
	}
}


