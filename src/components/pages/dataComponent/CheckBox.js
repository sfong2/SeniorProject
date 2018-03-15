import React, {Component} from 'react';

export default class CheckBox extends Component{

  render(){
    return (
      <div className="pretty p-default p-round">
          <input type="checkbox" defaultChecked={this.props.checked} onChange={(e) => this.props.onClickCheckBox(e, this.props.header, this.props.id)}/>
          <div className="state p-info-o">
              <label>{this.props.header}</label>
          </div>
      </div>
    )
  }
}