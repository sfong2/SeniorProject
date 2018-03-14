import React, {Component} from 'react';
import XLSX from 'xlsx';
import ButtonGroup from '../../datam/ButtonGroup';
import CheckBox from '../../datam/CheckBox';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

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

class Data extends Component{
    constructor(props){
        super(props);
        this.state = {
            settingStatus: false,
            settingContent: 'Show Table Cols Settings',
            data: [],
            header: [],
            tableCols: []
        }
        this.handleFile = this.handleFile.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onToggleSetting = this.onToggleSetting.bind(this);
        this.onToggleCols = this.onToggleCols.bind(this);
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
        const {data, header, tableCols, settingStatus, settingContent} = this.state;
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
            </div>
        )
    }
}

export default Data;