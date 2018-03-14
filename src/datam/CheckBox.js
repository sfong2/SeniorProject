import React, {Component} from 'react';

export default class CheckBox extends Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        return (
            <div className="pretty p-default p-round">
                <input type="checkbox" defaultChecked onChange={(e) => this.props.onToggleCols(e, this.props.title, this.props.id)}/>
                <div className="state p-info-o">
                    <label>{this.props.tile}</label>
                </div>
            </div>
        )
    }
}