import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {reducersCombine,actions} from './store';
import "./style.css";

const TITLE_NUMBER_FIELD = "Size field";
const PLACEHOLDER_NUMBER_FIELD = "Enter a number from 10 to 50...";
const TITLE_BUTTON_START = "Start";
const TITLE_BUTTON_STOP = "Stop";
const TITLE_BUTTON_CLEAR = "Clear";

class Main extends Component {
  constructor() {
    super();
    this.store = createStore(reducersCombine);
    this.state = {...this.store.getState()};
    this.store.subscribe(this.update);
  }

  update = () => this.setState(this.store.getState());

  clickButton = (element,buttonName) => {
    switch(buttonName) {
      case TITLE_BUTTON_CLEAR:
        this.changeSizeField(this.refs.size.value);
        break;
      case TITLE_BUTTON_START:
        this.store.dispatch(actions.activeTimer(true));
        break;
      case TITLE_BUTTON_STOP:
        this.store.dispatch(actions.activeTimer(false));
        break;
      default: break;
    }
  }


  componentDidUpdate = () => {
    if(this.state.activeTimer) {
      if(this.timer === undefined)
        this.timer = setInterval(this.recalc,100);
    } else {
      if(this.timer !== undefined) {
        clearInterval(this.timer);
        this.timer = undefined;
      }

    }
  }

  recalc = () => this.store.dispatch(actions.recalcElements());

  changeSizeField = (valueChange) => !this.state.activeTimer ? this.store.dispatch(actions.changeSizeField(valueChange)) : false;

  changeElement = (x,y) => !this.state.activeTimer ? this.store.dispatch(actions.updateElement(x,y)) : false;

  render() {
    const sizeElement = (100/this.state.elements.length).toString();
    return (
      <div className = {"container"}>
        <div className = {"row row-margin"}>
          <div className = {"col-sm"}>
            <div className="input-group">
              <span className ="input-group-addon">{TITLE_NUMBER_FIELD}</span>
              <input ref={"size"} type = {"text"} className = {"form-control"} placeholder = {PLACEHOLDER_NUMBER_FIELD} onChange={(e) => {this.changeSizeField(e.target.value)}}/>
              <span className={"input-group-btn"}>
                <Button className={"btn btn-success"} name={TITLE_BUTTON_START} callbackClick = {this.clickButton}/>
                <Button className={"btn btn-danger"} name={TITLE_BUTTON_STOP} callbackClick = {this.clickButton}/>
                <Button className={"btn btn-primary"} name={TITLE_BUTTON_CLEAR} callbackClick = {this.clickButton}/>
              </span>
            </div>
          </div>
        </div>

        <div className = {"row row-justify-content-center"}>
          <div className = {"field field-size"}>
            {this.state.elements.map(
              (elementArray,indexArray) => elementArray.map(
                (element,index) => {
                  return <Element key={indexArray + index} x = {indexArray} y = {index} size = {sizeElement} callbackClick={this.changeElement} isActive={element}/>
                }
              )
            )}
          </div>
        </div>

        <div className = {"row row-margin row-justify-content-center"}>
          <h4>
          {this.state.activeTimer ? "The process is running!" : "The process is stopped!"}
          </h4>
        </div>
      </div>
    );
  }
}

const Button = (props) => <button className = {props.className} type = {"button"} onClick = {(e) => props.callbackClick(e,props.name)}>{props.name}</button>;

const Element = (props) => <div className={(props.isActive ? "active" : "")} style={{height: + props.size + "%",width: props.size + "%",backgroundColor: (props.isActive ? "lime" : "gray")}} onClick = {() => props.callbackClick(props.x,props.y)}/>

ReactDOM.render(<Main/>,document.getElementById("root"));
