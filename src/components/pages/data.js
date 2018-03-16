import React, {Component} from 'react';
import XLSX from 'xlsx';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ButtonGroup from './dataComponent/ButtonGroup';
import ColSetting from './dataComponent/ColSetting';
import ActionTable from './dataComponent/ActionTable';
import LoadingGIF from './dataComponent/loading.gif';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import charts from 'fusioncharts/fusioncharts.charts';

var chartData = [];
var cData = {
  "chart": {
    "caption": "Suntisfy's Website",
    "subCaption": "Top keywords searched from 8/28/2017 - 10/22/2017 by searches",
    "exportenabled": "1",
    "exportatclient": "1",
    "exporthandler": "http://export.api3.fusioncharts.com",
    "html5exporthandler": "http://export.api3.fusioncharts.com",
    "numberPrefix": " ",
    "theme": "fint",
    "anchorBgHoverColor": "#96d7fa",
    "anchorBorderHoverThickness" : "4",
    "anchorHoverRadius":"7"
  },
  "data": chartData
}
charts(FusionCharts);
/*variables*/
var props_column_chart =
	{
		id: "line_chart",
		type: "line",
		dataSource: cData,
		width: "60%",
		height: 400,
		dataFormat: "json"
	};
var bargraph =
	{
		id: "bar_chart",
		type: "bar3d",
		dataSource: cData,
		width: "60%",
		height: 400,
		dataFormat: "json"

	};
var piechart =
	{
		id: "pie_chart",
		type: "pie3d",
		dataSource: cData,

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
const toFiexed2 = ["Spend", "Cost Per Click (CPC)", "7 Day Total Sales", "7 Day Advertised SKU Sales", "7 Day Other SKU Sales"]

const default_cols = ["Campaign Name", "Ad Group Name", "Keyword", "Match Type", "Customer Search Term", "Impressions", "Clicks", "Cost Per Click (CPC)", "Spend"]

const divStyle = {
  margin: 20
}

const sortedIndex = (columns, index) => {
  var low = 0, high = columns.length;

  while(low < high){
    var mid = (low + high) >>> 1;
    if (columns[mid].index < index) low = mid + 1;
    else high = mid;
  }
  return low;
}

export default class Data extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      headers: [],
      columns: [],
      filtered: [],
      actioned: [],
      loading: true,
      colBtnStatus: false,
      actBtnStatus: false,
      chartBtnStatus: false,
      isClicked: false
    }
    this.make_tableCol = this.make_tableCol.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.onClickClearBtn = this.onClickClearBtn.bind(this);
    this.onClickColBtn = this.onClickColBtn.bind(this);
    this.onClickCheckBox = this.onClickCheckBox.bind(this);
    this.onResetFiltered = this.onResetFiltered.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.onClickGetTableData = this.onClickGetTableData.bind(this);
    this.onClickActionBtn = this.onClickActionBtn.bind(this);

    //chartFunction
    this.handleClick = this.handleClick.bind(this);
		this.handleUnclick = this.handleUnclick.bind(this)
		this.handleClick2 = this.handleClick2.bind(this);
		this.handleUnclick2 = this.handleUnclick2.bind(this)
		this.handleClick3 = this.handleClick3.bind(this);
    this.handleUnclick3 = this.handleUnclick3.bind(this)
  }

  make_tableCol = (header, i) => {
    let col = {
      index: i,
      Header: header,
      accessor: header
    }

    if (header === "Match Type") {
      col["id"] = header;
      col["filterMethod"] = (filter, row) => {
        if (filter.value === "all") {
          return true;
        } else if (filter.value === "BROAD") {
          return row[filter.id] === "BROAD";
        } else if (filter.value === "PHRASE") {
          return row[filter.id] === "PHRASE";
        } else if (filter.value === "EXACT") {
          return row[filter.id] === "EXACT";
        }
      }

      col["Filter"] = ({ filter, onChange }) =>
        <select
          onChange={event => onChange(event.target.value)}
          style={{ width: "100%" }}
          value={filter ? filter.value : "all"}
        >
          <option value="all">Show All</option>
          <option value="BROAD">BROAD</option>
          <option value="PHRASE">PHRASE</option>
          <option value="EXACT">EXACT</option>
        </select>
    } else if (toFiexed2.includes(header)) {
      col["Cell"] = ({ value }) => (value.toFixed(2))
    } else if (header === "Customer Search Term") {
      col["Cell"] = this.renderEditable;
    }

    return col;
  }

  make_cols = headers => {
    let o = [], c = headers.length;
    for(var i = 0; i < c; i++){
      if (default_cols.includes(headers[i])) {
        o.push(this.make_tableCol(headers[i], i));
      }
    }
    return o;
  }

  handleFile = (file) => {
    this.setState({loading: true}, () => {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array'});
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws, {raw:true});
        const headers = XLSX.utils.sheet_to_json(ws, {header: 1})[0];
        const columns = this.make_cols(headers);

        this.setState({
          data:data,
          headers:headers,
          columns:columns,
          loading: false
        });
      };

      if(rABS){
        reader.readAsBinaryString(file);
      }else{
        reader.readAsArrayBuffer(file);
      }
    });

  }

  onClickClearBtn = () => {
    this.setState({
      data: [],
      headers: [],
      columns: [],
      filtered: [],
      actioned: [],
      loading: true,
      colBtnStatus: false,
      actBtnStatus: false,
      chartBtnStatus: false,
    });
  }

  onClickColBtn = () => {
    this.setState({
      colBtnStatus: !this.state.colBtnStatus
    })
  }

  onClickCheckBox = (e, header, index) => {
    let columns = this.state.columns;
    if(e.target.checked){
      let col = this.make_tableCol(header, index);
      columns.splice(sortedIndex(columns, index), 0, col);
    } else{
      columns = columns.filter(item => item.Header !== header)
    }
    this.setState({columns: columns});
  }

  onResetFiltered = () => {
    this.setState({filtered: []});
  }

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  onClickGetTableData = () => {
    // console.log(this.reactTable.getResolvedState())
    // console.log(this.reactTable.getResolvedState().sortedData)
    let dataObj = this.reactTable.getResolvedState().sortedData;
    chartData = [];
    for (var i = 0, len = dataObj.length; i < len; i++) {
      let o = {};
      o["label"] = dataObj[i]["Customer Search Term"];
      o["value"] = dataObj[i]["Clicks"];
      chartData.push(o);
      cData["data"] = chartData;
    }

    this.setState({chartBtnStatus: !this.state.chartBtnStatus});
  }

  onClickActionBtn = () => {
    // this.reactTable.getTdProps;
    this.setState({
      actBtnStatus: !this.state.actBtnStatus,
      // actioned: [],
    });
  }


  // chart Function

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

  render(){
    console.log(cData)
    const{isClick}=this.state;
		const{isClick2}=this.state;
		const{isClick3}=this.state;
		let LGbutton = null;
		let BGbutton = null;
    let PCbutton = null;

    const {data = []} = this.state;
    const dataStatus = data.length > 0 ? false : true;

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
      <div style={divStyle}>
        <div className="offset-md-1">
          <ButtonGroup
            dataStatus={dataStatus}
            dataTableStatus={this.state.actBtnStatus}
            handleFile={this.handleFile}
            onClickClearBtn={this.onClickClearBtn}
            onClickColBtn={this.onClickColBtn}
            colBtnCaption={this.state.colBtnStatus?"Hide":"Show"}
            onClickFilterBtn={this.onResetFiltered}
            onClickGetTableData={this.onClickGetTableData}
            onClickActionBtn={this.onClickActionBtn}
          />
        </div>

        <div style = {divStyle}>
          {this.state.colBtnStatus &&
            <ColSetting
              headers={this.state.headers}
              columns={this.state.columns}
              onClickCheckBox={this.onClickCheckBox}
            />
          }
        </div>

        {this.state.loading &&
          <div className="offset-md-1">
            <img src={LoadingGIF} alt="LoadingGIF"/>
          </div>
        }


        {this.state.chartBtnStatus && !this.state.actBtnStatus &&
          <div className="offset-md-3">
            <LGraphing isClick={isClick} />
            <BGraphing isClick={isClick2} />
            <PCGraphing isClick={isClick3} />
            {LGbutton}
            {BGbutton}
            {PCbutton}
          </div>
        }
        {this.state.actBtnStatus ?

          <ActionTable
            data={this.state.actioned}
          />
          :
          <div style={divStyle}>
            <ReactTable
              ref={el => this.reactTable = el}
              data={this.state.data}
              columns={
                [{
                  Header: "Action",
                  accessor: "action",
                  sortable: false,
                  filterable: false,
                  Cell: ({value}) => (<button style={{width: "100%", height: "100%"}} onClick={this.getTdProps}>Add</button>)
                }].concat(this.state.columns)}
              filterable
              filtered={this.state.filtered}
              onFilteredChange={filtered =>
                this.setState({ filtered }
              )}
              getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {

                    if (rowInfo) {
                      let id = column.id, row = rowInfo.original;
                      if (id === "action") {
                        let actioned = this.state.actioned;
                        if (!actioned.some(item => item.__rowNum__ === row.__rowNum__)) {
                          actioned.push(row)
                          console.log(actioned)
                          this.setState({actioned: actioned})

                        }
                      } else if (id !== "Customer Search Term") {
                        let cellInfo = {id: id, value: row[id]};
                        let filtered = this.state.filtered;
                        if (!filtered.some(filterItem => filterItem.id === id)) {
                          filtered.push(cellInfo);
                          this.setState({filtered: filtered})
                        }
                        console.log(filtered)
                      }
                    }
                    if (handleOriginal) {
                      handleOriginal()
                    }
                  }
                }
              }}
              className="-striped -highlight"
              defaultPageSize={10}
            />
          </div>
        }
      </div>
    )
  }
}

