import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import EditCard from "./editCard";
import { useDrag } from "react-dnd";

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
    this.delete = this.delete.bind(this);
    this.handleEditUpdate = this.handleEditUpdate.bind(this);
    this.handleAddChange = this.handleAddChange.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);
  }

  //click card to edit (show modal)
  popupEdit(card) {
    this.setState({ edit: true, currentCard: card });
  }

  handleEditUpdate(e) {
    this.setState({ edit: e, currentCard: "" });
  }

  delete(tempCard) {
    console.log(tempCard);
    this.props.group.cards = this.props.group.cards.filter(
      (card) => card !== tempCard
    );
    this.props.onCardsChange();
  }
  handleAddChange(event) {
    //update newCard
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
  handleAddSubmit(event) {
    //add newCard into cards and update cards in Group
    event.preventDefault();
    let temp = this.state.newCard;
    this.props.group.cards = [...this.props.group.cards, temp];
    //const tempCards = [...this.props.cards, this.state.newCard];
    this.props.onCardsChange();
    this.setState({
      newCard: {
        value: "",
        cardId: "",
        checklists: [],
        labels: [],
        dueDate: "",
        description: "",
        comments: [],
        groupKey: this.props.group.key,
      },
    });
    this.setState({ showAddButton: false });
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
          <form onSubmit={this.handleAddSubmit}>
            <input
              type="text"
              placeholder="Enter Text"
              onChange={this.handleAddChange}
            ></input>
            {this.state.showAddButton && <button type="submit">Add</button>}
          </form>
        </OutsideClickHandler>
      );
    } else if (!this.state.add) {
      return (
        <div>
          <p onClick={() => this.popupEdit(this.props.card)}>
            {this.props.card.value}
          </p>
          <p>{this.props.card.description}</p>
          <div>
            {this.props.card.checklists.map((checklist, index) => {
              return (
                <div key={index}>
                  <p>{checklist.checklistName}</p>
                  <ul>
                    {checklist.todo.map((todo, index) => {
                      return <li key={index}>{todo.text}</li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <button onClick={() => this.delete(this.props.card)}>delete</button>
        </div>
      );
    }
  }
}

export default Card;
