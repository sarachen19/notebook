import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import OutsideClickHandler from "react-outside-click-handler";
import autosize from "autosize";
import "./allGroups.css";
import Checklist from "./checklist";
import AddTodo from "./addTodo";
import Label from './label';
//Modal.setAppElement("#root");
 
class EditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: this.props.card,
      tempDescription: this.props.card.description,
      newChecklist: "",
      showModal: true,
      editDescription: false,
      addChecklist: false,
      addLabel: false,
    };
    
    this.Info = this.Info.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    
    this.editDescription = this.editDescription.bind(this);
    this.exitEditDescription = this.exitEditDescription.bind(this);
    this.GetDescription = this.GetDescription.bind(
      this
    );
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDescriptionSubmit = this.handleDescriptionSubmit.bind(this);
    this.formref = React.createRef();

    this.addChecklist = this.addChecklist.bind(this);
    this.onAddChecklists = this.onAddChecklists.bind(this);
    this.ShowAddChecklist = this.ShowAddChecklist.bind(this);
    this.Checklists = this.Checklists.bind(this);
    this.addChecklistPopoverRef = React.createRef();
    this.editTodoInput = React.createRef();

    this.addLabelPopoverRef = React.createRef();
    this.addLabel = this.addLabel.bind(this);
    this.onAddLabels = this.onAddLabels.bind(this);
    this.Labels = this.Labels.bind(this);
  }
  
  /*
   *On close, update all values in newCard, remove the original card, then add newCard into cards property.
   */
  handleCloseModal() {
    this.setState({ showModal: false });
    this.props.edit(false);
   this.props.onCardsChange();
  }

  /*
  --------------------Description handler--------------------
  */
  editDescription() {
    this.setState({ editDescription: true });
  }
  exitEditDescription() {
    this.setState({ editDescription: false });
  }
  handleDescriptionChange(e) {
    this.setState({ tempDescription: e.target.value });
  }
  handleDescriptionSubmit(e) {
    e.preventDefault();
    this.props.card.description = this.state.tempDescription;
  }
  GetDescription() {
    return ( 
      <Form onSubmit={this.handleDescriptionSubmit}  style={{margin:"0 20px 0 0"}}>
        <Form.Label>Description</Form.Label>
          <Form.Control ref={this.formref} as="textarea" rows="1" value={this.state.tempDescription} onClick={this.editDescription} onChange={this.handleDescriptionChange}/>
          <OutsideClickHandler onOutsideClick={this.exitEditDescription} display={"contents"}>  
            {this.state.editDescription && <button type="submit">Save</button>}
          </OutsideClickHandler>
      </Form>
    );
  }

  /*
  --------------------Checklist handler--------------------
  */
  onAddChecklists() {
    this.setState({ addChecklist: false }); //增加结束 恢复默认值 参数传入Checklist
  }
  addChecklist() {
    this.setState({ addChecklist: !this.state.addChecklist }); //点击增加时
  }
  ShowAddChecklist() {
    return (
      <OutsideClickHandler
        onOutsideClick={() => {this.setState({addChecklist: false})}}
      >
        <div ref={this.addChecklistPopoverRef} >
        <button onClick={this.addChecklist} >Checklist</button>
        <Overlay
        show={this.state.addChecklist}
        target={this.addChecklistPopoverRef.current}
        placement="bottom"
        container={this.addChecklistPopoverRef.current}
        containerPadding={20}
        >
          <Popover id="popover-contained-checklist">
            <Popover.Content>
              <Checklist
                addChecklist={true}
                card={this.props.card}
                onCardsChange={this.props.onCardsChange}
                onAddChecklists={this.onAddChecklists}
                />
            </Popover.Content>
          </Popover>
        </Overlay>
        </div>
      </OutsideClickHandler>      
    )
  }
  /*
  --------------------Todo handler--------------------
  */
  toggleTodo(checklist, oneTodo, todoIndex) {
    checklist.todo.forEach((value, index) => {
      if (index === todoIndex) {
        value.finished = !value.finished;
      }
    });
    this.props.onCardsChange();
  }
  editTodo(checklist, todo, index) {
    ReactDOM.render(
      <OutsideClickHandler
        onOutsideClick={() => {
          ReactDOM.unmountComponentAtNode(
            document.getElementById(checklist.key + "-" + index)
          );
          ReactDOM.render(
            todo.text,
            document.getElementById(checklist.key + "-" + index)
          );
        }}
      >
        <form onSubmit={(e) => this.editTodoSubmit(e, checklist, todo, index)}>
          <input
            type="text"
            defaultValue={todo.text}
            ref={this.editTodoInput}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </OutsideClickHandler>,
      document.getElementById(checklist.key + "-" + index)
    );
  }
  editTodoSubmit(e, checklist, todo, todoIndex) {
    e.preventDefault();
    const tempTodo = this.editTodoInput.current.value;
    const targetId = checklist.key + "-" + todoIndex;
    checklist.todo.forEach((value, index) => {
      const tempId = checklist.key + "-" + index;
      if (tempId === targetId) {
        checklist.todo[index].text = tempTodo;
      }
    });
    ReactDOM.unmountComponentAtNode(
      document.getElementById(checklist.key + "-" + todoIndex)
    );
    ReactDOM.render(
      tempTodo,
      document.getElementById(checklist.key + "-" + todoIndex)
    );
    this.props.onCardsChange();
  }

  /*
  --------------------one card's checklist and todo render--------------------
  */
  Checklists() {
    const checklists = this.props.card.checklists;
    return checklists.map((checklist, index) => {
      return (
        <div key={index}>
          <p>{checklist.checklistName}</p>
          <ul>
            {checklist.todo.map((todo, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    onClick={() => this.toggleTodo(checklist, todo, index)}
                    style={{ display: "inline-block" }}
                  ></input>
                  <li
                    onClick={() => this.editTodo(checklist, todo, index)}
                    id={checklist.key + "-" + index}
                    style={{
                      textDecoration: todo.finished ? "line-through" : "none",
                      display: "inline-block",
                    }}
                  >
                    {todo.text}
                  </li>
                </div>
              );
            })}
          </ul>
          <AddTodo
            checklist={checklist}
            onCardsChange={this.props.onCardsChange}
          />
        </div>
      );
    });
  }
/*
  --------------------one card's info--------------------
  */
 Info() {
  const GetDescription = this.GetDescription;
  const Checklists = this.Checklists;
   return(
    <>
      <Label 
        card={this.props.card}
        onCardsChange={this.props.onCardsChange}
        onAddLabels={this.onAddLabels}
      />
      <GetDescription />
      <Checklists />
      <div>Activity</div>
    </>
   );
 }

  /*
  --------------------Label handler--------------------
  */
 addLabel() {
   this.setState({addLabel: !this.state.addLabel});
 }
 onAddLabels() {
   this.setState({addLabels: false});
 }
  Labels() {
      return (
          <div>
          <button onClick={this.addLabel}>Label</button>
          <Overlay
          show={this.state.addLabel}
          target={this.addLabelPopoverRef.current}
          placement="right"
          arrowProps="none"
          container={this.addLabelPopoverRef.current}
          containerPadding={20}
          >
            <OutsideClickHandler
             onOutsideClick={() => {this.setState({addLabel: false})}}
             >
              <Popover id="popover-contained-label" data-container="body">
                <Popover.Content>
                  <Label
                    addLabel={true}
                    card={this.props.card}
                    onCardsChange={this.props.onCardsChange}
                    onAddLabels={this.onAddLabels}
                    />
                </Popover.Content>
              </Popover>
            </OutsideClickHandler>      
          </Overlay>
          </div>
      );
  }

  /*
  --------------------description autosize--------------------
  */
 componentDidMount(){
  autosize(this.formref.current);
 }

  render() {
    const Info = this.Info;
    const ShowAddChecklist = this.ShowAddChecklist;
    const Labels = this.Labels;
    return (
      <div id="addLabelPopoverRef" >
      <Modal 
      show={this.state.showModal} 
      onHide={this.handleCloseModal} 
      scrollable
      >
        <Modal.Header closeButton ref={this.addLabelPopoverRef}>
          <Modal.Title>{this.props.card.value}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="flex-grow-1">
              <Info />
            </div>  
            <div style={{width:"30%"}}>
              <ShowAddChecklist />
              <Labels/>
            </div> 
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={this.handleCloseModal}>
            Close
          </button>
          <button variant="primary" onClick={this.handleCloseModal}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default EditCard;