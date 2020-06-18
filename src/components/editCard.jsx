import React, { Component } from "react";
import ReactDOM from "react-dom";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button} from 'react-bootstrap';
import OutsideClickHandler from "react-outside-click-handler";
import autosize from "autosize";
import Checklist from "./checklist";
import AddTodo from "./addTodo";
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

    this.addChecklist = this.addChecklist.bind(this);
    this.onAddChecklists = this.onAddChecklists.bind(this);
    this.Checklists = this.Checklists.bind(this);

    this.editTodoInput = React.createRef();
    this.formref = React.createRef();
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
      <Form onSubmit={this.handleDescriptionSubmit}>
        <Form.Label>Description</Form.Label>
        <OutsideClickHandler onOutsideClick={this.exitEditDescription}>
          <Form.Control ref={this.formref} as="textarea" rows="1" value={this.state.tempDescription} onClick={this.editDescription} onChange={this.handleDescriptionChange}/>
          {this.state.editDescription && <Button type="submit">Save</Button>}
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
    this.setState({ addChecklist: true }); //点击增加时
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
      <GetDescription />
      <Checklists />
      <div>Activity</div>
    </>
   );
 }
 componentDidMount(){
  autosize(this.formref.current);
 }

  render() {
    const Info = this.Info;
    return (
      <Modal 
      show={this.state.showModal} 
      onHide={this.handleCloseModal} 
      scrollable
      centered>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.card.value}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex">
            <div className="flex-grow-1"><Info /></div>  
            <div>          
              <button onClick={this.addChecklist}>Checklist</button>
              {this.state.addChecklist && (
              <Checklist
                addChecklist={this.state.addChecklist}
                card={this.props.card}
                onCardsChange={this.props.onCardsChange}
                onAddChecklists={this.onAddChecklists}
              />)}
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
    );
  }
}

export default EditCard;
