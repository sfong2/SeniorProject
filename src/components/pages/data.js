import React, {Component} from 'react';
import XLSX from 'xlsx';
import ButtonGroup from '../../datam/ButtonGroup';
import CheckBox from '../../datam/CheckBox';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';
import data from '../../GraphData/data';
import data2 from '../../GraphData/data2';
import data3 from '../../GraphData/data3';

charts(FusionCharts);

var props_column_chart =
	{
		id: "line_chart",
		type: "line",
		dataSource: data,
		width: "60%",
		height: 400,
		dataFormat: "json"
	};
var bargraph=
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

const divStyle = {
    margin: 20,
}

const make_header = cols => {
    let o = [], c = cols.length;
    for(var i = 0; i < c; i++){
        o[i] = {Header: cols[i], accessor: cols[i], id: i};
    }
    return o;
}

const sortedIndex = (tableCols, value) => {
    var low = 0,
        high = tableCols.length;

        while(low < high){
            var mid = (low + high) >>> 1;
            if (tableCols[mid].id < value) low = mid + 1;
            else high = mid;
        }
        return low;
}

function Graph(props){
    return(
        <div>
		    <ReactFC{...props_column_chart} />
	    </div>
    );
}

function CGraph(props){
    return(
        <h1>Nothing</h1>
    );
}

function GraphIt(props){
    return(
        <button onClick={props.onClick}>Click</button>
    );
}

function GraphNo(props){
    return(
        <button onClick={props.onClick}>Unclick</button>
    );
}

function Graphing(props){
    const isClick = props.isClick;
    if(isClick){
        return <Graph />
    }
    return <CGraph />
}

class Data extends Component{
    constructor(props){
        super(props);
        this.state = {
            settingStatus: false,
            settingContent: 'Show Table Cols Settings',
            data: [],
            header: [],
            tableCols: [],
            isClicked: false
        }
        this.handleFile = this.handleFile.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onToggleSetting = this.onToggleSetting.bind(this);
        this.onToggleCols = this.onToggleCols.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.handleUnclick = this.handleUnclick.bind(this)
    }

    handleClick(){
        this.setState({isClick: true});
    }

    handleUnclick(){
        this.setState({isClick: false});
    }

    handleFile = (file) => {
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array', cellDates:true, cellNF: false, cellText: false});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            const data = XLSX.utils.sheet_to_json(ws, {dataNF:"MM/DD/YYYY"});
            const header = XLSX.utils.sheet_to_json(ws, {header: 1})[0];
            const tableCols = make_header(header);
            this.setState({data:data, header:header, tableCols:tableCols});
        };
        if(rABS){
            reader.readAsBinaryString(file);
        }else{
            reader.readAsArrayBuffer(file);
        }
    }

    clearData = () => {
        this.setState({data: [], header: [], tableCols: []});
    }

    onToggleSetting = () => {
        let {settingStatus} = this.state;
        this.setState({
            settingStatus: !settingStatus,
            settingContent: settingStatus ? "Show Table Cols Settings" : "Hide Table Cols Setting",
        })
    }

    onToggleCols = (e, title, index) => {
        let tableCols = this.state.tableCols;
        if(e.target.checked){
            let cols = {Header: title, accessor: title, id: index}
            tableCols.splice(sortedIndex(tableCols, index), 0, cols);
        } else{
            tableCols = tableCols.filter(item => item.Header !== title)
        }
        this.setState({tableCols: tableCols});
    }

    render(){
        const {data, header, tableCols, settingStatus, settingContent, isClick} = this.state;
        let Gbutton = null;
        if(isClick){
            Gbutton = <GraphIt onClick={this.handleUnclick}/>;
        }else{
            Gbutton = <GraphNo onClick={this.handleClick}/>;
        }
        return (
            <div style={divStyle}>
                <div className="row">
                    <div className="offset-md-1">
                        <ButtonGroup
                            header={this.state.header}
                            settingStaus={settingStatus}
                            settingContent={settingContent}
                            onToggleSetting={this.onToggleSetting}
                            clearData={this.clearData}
                            handleFile={this.handleFile}
                        />
                    </div>
                </div>

                <div style = {divStyle}>
                    {settingStatus &&
                        header.map((item, i) => {
                            return(
                                <CheckBox
                                    key={i}
                                    id={i}
                                    title={item}
                                    onToggleCols={this.onToggleCols}
                                />
                            )
                        })
                    }
                </div>
                <div style={divStyle}>
                    <ReactTable
                        data={data}
                        columns={[{
                            Header: "Action",
                            accessor: '__rowNum__',
                            Cell: ({value}) => (<button type="button" onClick={() => {console.log(data[value - 1])}}>Click</button>)
                        }
                        ].concat(tableCols)}
                        className="-striped -highlight"
                    />
                </div>
                <div>
                    <Graphing isClick={isClick}/>
                    {Gbutton}
                </div>
            </div>
        )
    }
}

export default Data;