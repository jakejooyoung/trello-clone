import React from 'react';
import ReactDOM from 'react-dom';
import Board from "./Board.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='app'>
				<Board></Board>
			</div>
		);
	}
}


