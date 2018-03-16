import React, {Component} from 'react';
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
  render() {
    console.log(this.props.data)
    return (
      <div>
        <button className="btn btn-success">Download Operation File</button>
        <ReactTable
          data={this.state.data}
          columns={this.state.columns}
        />
      </div>
    )
  }
}