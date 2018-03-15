import React, {Component} from 'react';
import DataInput from './DataInput';

const divStyle = {
    marginLeft: 20
}

export default class ButtonGroup extends Component{
    constructor(props){
        super(props);
        this.onClickClearBtn = this.onClickClearBtn.bind(this);
    }

    onClickClearBtn = () => {
      this.dataInput.inputEntity.value = '';
      this.props.onClickClearBtn();
    }

    render(){
        return(
          <div className="row">
              <DataInput ref={input => { this.dataInput = input; }} handleFile={this.props.handleFile}/>
              <button type="button" className="btn btn-danger" style={divStyle} onClick={this.onClickClearBtn}>Clear Data</button>
              <button type="button" className="btn btn-info" style={divStyle} onClick={this.props.onClickColBtn}>{this.props.colBtnCaption}</button>
              <button type="button" className="btn btn-success" style={divStyle} onClick={this.props.onClickFilterBtn}>{this.props.filterBtnCaption}</button>
          </div>
        )
    }
}