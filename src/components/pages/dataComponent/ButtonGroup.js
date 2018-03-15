import React, {Component} from 'react';
import InputButton from './InputButton';

const divStyle = {
  marginLeft: 20
}

export default class ButtonGroup extends Component{
  constructor(props){
    super(props);
  }

  onClickClearBtn = () => {
    this.inputBtn.inputFile.value = '';
    this.props.onClickClearBtn();
  }

  render(){
    return(
      <div className="row">
          <InputButton ref={el => { this.inputBtn = el; }} handleFile={this.props.handleFile}/>
          <button type="button" className="btn btn-danger" style={divStyle} onClick={this.onClickClearBtn}>Clear Data</button>
          <button type="button" className="btn btn-info" style={divStyle} onClick={this.props.onClickColBtn}>{this.props.colBtnCaption} Col Setting</button>
          <button type="button" className="btn btn-success" style={divStyle} onClick={this.props.onClickFilterBtn}> Reset Filtered</button>
      </div>
    )
  }
}