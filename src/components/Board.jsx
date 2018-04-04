import React from "react";

const headers=new Headers({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	    board:{},
	  }
  }

  componentDidMount(event) {
	  const init = {  
	  	method : 'GET',
	    headers: headers
	  }

	  const url='api/boards/2';
	  const req = new Request(url, init);

    fetch(req)
      .then(res => {
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then(json =>{
      	this.setState({ 
          'board' : json[0],
        }) 
      })
      .catch(function(err){
        console.log("ERROR! " + err)
      });
  }
  render() {
  	const board=this.state.board;
    return (
    	<div>
      <div>{board.id}</div>
      <div>{board.title}</div>
      <div>{board.description}</div>
      </div>
    );
  }
}