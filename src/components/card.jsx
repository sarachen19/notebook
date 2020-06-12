import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import EditCard from "./editCard";
import { ChecklistSourceBox } from "./checklistSourceBox";
import Validators from "./validators";
const style = {
  width: "100%",
};
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCard: "", //card to be edited
      edit: false, // true to show modal, false to hide
      newCard: {
        value: "",
        checklists: [],
        labels: [],
        dueDate: "",
        description: "",
        comments: [],
        groupKey: this.props.group.key,
      },
      add: false || this.props.add,
      showAddButton: false,
    };
    this.popupEdit = this.popupEdit.bind(this);
    //this.delete = this.delete.bind(this);
    this.handleEditUpdate = this.handleEditUpdate.bind(this);
    //this.addCardInput = React.createRef();
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
  }

  //click card to edit (show modal)
  popupEdit(card) {
    this.setState({ edit: true, currentCard: card });
  }

  handleEditUpdate(e) {
    this.setState({ edit: e, currentCard: "" });
  }
  /*
  delete(tempCard) {
    //console.log(tempCard);
    this.props.group.cards = this.props.group.cards.filter(
      (card) => card !== tempCard
    );
    this.props.onCardsChange();
  }
  */
  handleAddChange(event) {
    //update newCard
    if (Validators.isEmpty(event.target.value) === false) {
      this.setState({
        newCard: {
          value: event.target.value,
          checklists: [],
          labels: [],
          dueDate: "",
          description: "",
          comments: [],
          groupKey: this.props.group.key,
        },
        showAddButton: true,
      });
    }
  }
  handleAddSubmit(event) {
    //add newCard into cards and update cards in Group
    event.preventDefault();
    if (Validators.isEmpty(event.target.firstElementChild.value) === false) {
      this.props.group.cards.push(this.state.newCard);
      this.setState({
        newCard: {
          value: "",
          checklists: [],
          labels: [],
          dueDate: "",
          description: "",
          comments: [],
          groupKey: "",
        },
        showAddButton: false,
      });
      this.props.onCardsChange();
    }
  }

  render() {
    if (this.state.edit) {
      return (
        <EditCard
          edit={this.handleEditUpdate}
          card={this.state.currentCard}
          group={this.props.group}
          onCardsChange={this.props.onCardsChange}
        />
      );
    }
    if (this.state.add) {
      return (
        <OutsideClickHandler
          onOutsideClick={() => {
            this.setState({
              showAddButton: false,
            });
          }}
        >
          {!this.state.showAddButton && (
            <p
              onClick={() => {
                this.setState({
                  showAddButton: true,
                });
              }}
            >
              Add another card
            </p>
          )}
          {this.state.showAddButton && (
            <form onSubmit={this.handleAddSubmit}>
              <input
                type="text"
                placeholder="Enter card name"
                onChange={this.handleAddChange}
                defaultValue=""
              ></input>
              <br />
              <button type="submit">Add</button>
            </form>
          )}
        </OutsideClickHandler>
      );
    } else if (!this.state.add) {
      return (
        <div style={style}>
          <p onClick={() => this.popupEdit(this.props.card)}>
            {this.props.card.value}
          </p>

          <p>{this.props.card.description}</p>

          {this.props.card.checklists.map((checklist, index) => {
            return (
              <ChecklistSourceBox
                key={index}
                k={index}
                card={this.props.card}
                checklist={checklist}
                onCardsChange={this.props.onCardsChange}
              />
            );
          })}

          {/*<button onClick={() => this.delete(this.props.card)}>delete</button>*/}
        </div>
      );
    }
  }
}

export default Card;
