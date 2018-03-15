import React, {Component} from 'react';
import CheckBox from './CheckBox';

export default class ColSetting extends Component {

  render() {


    return (
      this.props.headers.map((header, i) => {
        return (
          <CheckBox
            key={i}
            id={i}
            checked={this.props.columns.some(col => col.Header === header)}
            header={header}
            onClickCheckBox={this.props.onClickCheckBox}
          />
        )
      })
    )
  }
}