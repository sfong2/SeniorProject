import React, {Component} from 'react';
import XLSX from 'xlsx';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
const headers = ["Campaign Name", "Campaign Daily Budget", "Campaign Start Date", "Campaign End Date", "Campaign Targeting Type",	"Ad Group Name", "Max Bid", "SKU", "Keyword", "Match Type", "Campaign Status", "Ad Group Status", "Status", "Bid+"];

export default class ActionTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      columns: [],
    }

    this.renderEditable = this.renderEditable.bind(this);
    this.make_act_col = this.make_act_col.bind(this);
    this.make_cols = this.make_cols.bind(this);
    this.onClickDownloadFile = this.onClickDownloadFile.bind(this);
  }

  componentDidMount = () => {
    this.setState({columns: this.make_cols(headers)});
  }

  make_act_col = (header) => {
    let c = {
      Header: header,
      accessor: header
    }
    if (header === "Keyword") {
      c["accessor"] = "Customer Search Term";
      c["Cell"] = this.renderEditable;
    } else if (header === "Match Type") {
      c["Cell"] = this.renderEditable;
    }
    return c;
  }

  make_cols = headers => {
    let o = [], c = headers.length;
    for(var i = 0; i < c; i++){
      o.push(this.make_act_col(headers[i]));
    }
    return o;
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

  onClickDownloadFile = () => {
    /* convert state to workbook */
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate XLSX file and send to client */
    XLSX.writeFile(wb, "sheetjs.xlsx")
  }

  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.onClickDownloadFile}>Download Operation File</button>
        <ReactTable
          data={this.state.data}
          columns={[{
            Header: "Action",
            accessor: "action",
            Cell: ({value}) => (<button style={{width: "100%", height: "100%"}} onClick={this.getTdProps}>Remove</button>)}
          ].concat(this.state.columns)}
          getTdProps={(state, rowInfo, column, instance) => {
                return {
                  onClick: (e, handleOriginal) => {
                    if (rowInfo) {
                      let id = column.id, row = rowInfo.original;
                      if (id === "action") {
                        let data = this.state.data;
                        data = data.filter(item => item.__rowNum__ !== row.__rowNum__);
                        this.setState({data: data})
                      }
                    }
                    if (handleOriginal) {
                      handleOriginal()
                    }
                  }
                }
              }}
        />
      </div>
    )
  }
}