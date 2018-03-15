import React, {Component} from 'react';
import XLSX from 'xlsx';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import ButtonGroup from './dataComponent/ButtonGroup';
import ColSetting from './dataComponent/ColSetting';
import CheckBox from './dataComponent/CheckBox';
import LoadingGIF from './dataComponent/loading.gif';


const make_cols = headers => {
  let o = [], c = headers.length;
  for(var i = 0; i < c; i++){
    if (default_cols.includes(headers[i])) {
      o.push({
        id: i,
        Header: headers[i],
        accessor: headers[i],
      })
    }
  }
  return o;
}

const default_cols = ["Campaign Name", "Ad Group Name", "Keyword", "Match Type", "Customer Search Term", "Impressions", "Clicks", "Cost Per Click (CPC)", "Spend"]

const divStyle = {
  margin: 20
}

const sortedIndex = (columns, id) => {
  var low = 0, high = columns.length;

  while(low < high){
    var mid = (low + high) >>> 1;
    if (columns[mid].id < id) low = mid + 1;
    else high = mid;
  }
  return low;
}

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      headers: [],
      columns: [],
      tableFiltered: [],
      loading: false,
      colBtnStatus: false
    }
    this.handleFile = this.handleFile.bind(this);
    this.onClickClearBtn = this.onClickClearBtn.bind(this);
    this.onClickColBtn = this.onClickColBtn.bind(this);
    this.onClickCheckBox = this.onClickCheckBox.bind(this);
    this.onResetFiltered = this.onResetFiltered.bind(this);
  }

  handleFile = (file) => {
    this.setState({loading: true});
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, {type:rABS ? 'binary' : 'array', cellDates:true, cellNF: false, cellText: false});
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, {dataNF:"MM/DD/YYYY"});
      const headers = XLSX.utils.sheet_to_json(ws, {header: 1})[0];
      const columns = make_cols(headers);

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
  }

  onClickClearBtn = () => {
    this.setState({
      data: [],
      headers: [],
      columns: [],
      loading: false,
      colBtnStatus: false,
    });
  }

  onClickColBtn = () => {
    this.setState({
      colBtnStatus: !this.state.colBtnStatus
    })
  }

  onClickCheckBox = (e, col, index) => {
    let columns = this.state.columns;
    if(e.target.checked){
      let cols = {Header: col, accessor: col, id: index}
      columns.splice(sortedIndex(columns, index), 0, cols);
    } else{
      columns = columns.filter(item => item.Header !== col)
    }
    this.setState({columns: columns});
  }

  onResetFiltered = () => {
    this.setState({filtered: []});
  }
  render(){
    console.log(this.state.filtered)
    return (
      <div style={divStyle}>
        <div className="offset-md-1">
          <ButtonGroup
            handleFile={this.handleFile}
            onClickClearBtn={this.onClickClearBtn}
            onClickColBtn={this.onClickColBtn}
            colBtnCaption={this.state.colBtnStatus?"Hide":"Show"}
            onClickFilterBtn={this.onResetFiltered}
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

        {this.state.loading ?
          <div className="offset-md-1">
            <img src={LoadingGIF} alt="LoadingGIF"/>
          </div>
          :
          <div style={divStyle}>
            <ReactTable
              data={this.state.data}
              columns={[].concat(this.state.columns)}
              filterable
              filtered={this.state.filtered}
              onFilteredChange={filtered => this.setState({ filtered })}
              className="-striped -highlight"
            />
          </div>
        }
      </div>
    )
  }
}