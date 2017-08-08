import React,{Component} from 'react';
import ReactDom from 'react-dom';
import {createStore} from 'redux';

class Test extends Component{
	constructor(props){
		super(props);
		this.state = {
			str:"Hello,world",
			value:"test222",
			li:[1,2,3,4,5,6,7,8]
		}
	}
	handleChange(event){
		this.setState({value:event.target.value})
	}
	aclick(){
		var str = this.refs.myInput.value
		this.setState({str:"修改为hello",value:1233213123});
		console.log(this.state.value)
	}
	render(){		
		return <div>
				<a onClick={this.aclick.bind(this)}>点击确定</a>
				<h1>{this.state.str}</h1>
				<ul>
					{this.state.li.map(function(item,index){
						return <li key={`li${index}`}>{item}</li>
					})}
				</ul>
				<input ref="myInput" onChange={this.handleChange.bind(this)} type="text" value={this.state.value}></input>
			</div>
	}
}

ReactDom.render(
    <Test></Test>,
    document.getElementById('example')
);
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([ action.text ])
    default:
      return state
  }
}

let store = createStore(todos, [ 'Use Redux' ])

store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})
