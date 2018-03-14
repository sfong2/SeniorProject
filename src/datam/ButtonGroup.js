import React, {Component} from 'react';
import DataInput from './DataInput';

const divStyle = {
    marginLeft: 20
}

export default class ButtonGroup extends Component{
    constructor(props){
        super(props);
        this.state = {
            settingStatus: false,
            settingContent: "Show Table Cols Settings"
        }
        this.clearData = this.clearData.bind(this);
    }

    clearData = () => {
        this.dataInput.inputEntity.value = '';
        this.props.clearData();
    }

    render(){
        return(
            <div className="row">
                <DataInput ref={input => { this.dataInput = input; }} handleFile={this.props.handleFile}/>
                <button type="button" className="btn btn-danger" style={divStyle} onClick={this.clearData}>Clear Data</button>
                <button type="button" className="btn btn-info" style={divStyle} onClick={this.props.onToggleSetting}>{this.props.settingContent}</button>
            </div>
        )
    }
}