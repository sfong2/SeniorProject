import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import data from './components/data';
import data2 from './components/data2';
import data3 from './components/data3';
import App from './App';
// Load the charts module pass FusionCharts as dependency
charts(FusionCharts);
/*variables*/
var props_column_chart =
	{
		id: "line_chart",
		type: "line",
		dataSource: data,
		width: "60%",
		height: 400,
		dataFormat: "json"
	};
var bargraph =
	{
		id: "bar_chart",
		type: "bar3d",
		dataSource: data2,
		width: "60%",
		height: 400,
		dataFormat: "json"

	};
var piechart =
	{
		id: "pie_chart",
		type: "pie3d",
		dataSource: data3,

		width: "60%",
		height: 400,
		dataFormat: "json"
	};
/*Render Graph*/
function Graph(props) {
	return (
		<div>
			<ReactFC{...props_column_chart} />
		</div>
	);
}
function BGGraph(props) {
	return (
		<div>
			<ReactFC{...bargraph} />
		</div>
	);
}
function PCGraph(props) {
	return (
		<div>
			<ReactFC{...piechart} />
		</div>
	);
}
/*Display Heading & Buttons*/
function Heading(props) {
	return (<h1>View Graph Displays</h1>);
}
function Back(props) {
	return (<button onClick={props.onClick}>Back</button>);
}
function LineGraph(props) {
	return (<button onClick={props.onClick}>Line Graph</button>);
}
function BarGraph(props) {
	return (<button onClick={props.onClick}>Bar Graph</button>);
}
function PieGraph(props) {
	return (<button onClick={props.onClick}>Pie Chart</button>);
}

/*Handle Buttons' Click*/
function LGraphing(props) {
	const isClick = props.isClick;
	if (isClick) {
		return <Graph />
	}
	return <Heading />
}
function BGraphing(props) {
	const isClick2 = props.isClick;
	if (isClick2) {
		return <BGGraph />
	}
	return <h5> </h5>
}
function PCGraphing(props) {
	const isClick3 = props.isClick;
	if (isClick3) {
		return <PCGraph />
	}
	return <h5> </h5>
}
class Graphs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }

        this.handleClick = this.handleClick.bind(this);
		this.handleUnclick = this.handleUnclick.bind(this)
		this.handleClick2 = this.handleClick2.bind(this);
		this.handleUnclick2 = this.handleUnclick2.bind(this)
		this.handleClick3 = this.handleClick3.bind(this);
        this.handleUnclick3 = this.handleUnclick3.bind(this)
	}
	/*Handle the clicks*/
    handleClick() {
        this.setState({ isClick: true });
    }
    handleUnclick() {
        this.setState({ isClick: false });
	}
	handleClick2() {
        this.setState({ isClick2: true });
    }
    handleUnclick2() {
        this.setState({ isClick2: false });
	}
	handleClick3() {
        this.setState({ isClick3: true });
    }
    handleUnclick3() {
		this.setState({ isClick3: false });
	}
	/*Render the buttons and graphs when clicked*/
    render() {
		const{isClick}=this.state;
		const{isClick2}=this.state;
		const{isClick3}=this.state;
		let LGbutton = null;
		let BGbutton = null;
		let PCbutton = null;
		
		/*Actions that occur once you click the button*/
        if (isClick) {
            LGbutton = <Back onClick={this.handleUnclick} />;
        } else {
            LGbutton = <LineGraph onClick={this.handleClick} />;
		}
		if (isClick2) {
            BGbutton = <Back onClick={this.handleUnclick2} />;
        } else {
            BGbutton = <BarGraph onClick={this.handleClick2} />;
		}
		if (isClick3) {
            PCbutton = <Back onClick={this.handleUnclick3} />;
        } else {
            PCbutton = <PieGraph onClick={this.handleClick3} />;
		}
        return (
			/*rendering the graph once you click the button*/
			<div>
			
				<LGraphing isClick={isClick} />
				<BGraphing isClick={isClick2} />
				<PCGraphing isClick={isClick3} />	
				{LGbutton}
				{BGbutton}
				{PCbutton}
			</div>
		)
	}
}