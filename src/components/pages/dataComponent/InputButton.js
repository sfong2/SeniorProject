import React, {Component} from 'react';

const SheetJSFT = [
  "xlsx", "xlsb", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(function(x){return "." + x;}).join(",");

export default class InputButton extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const files = e.target.files;
    if(files && files[0]) this.props.handleFile(files[0]);
  }

  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} ref={el => {this.inputFile = el;}} />
        </div>
      </form>
    )
  }
}