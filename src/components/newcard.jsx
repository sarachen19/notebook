import React, { Component } from "react";
import OutsideClickHandler from "react-outside-click-handler";

class NewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCard: {
        value: "",
        key: "",
        checklists: [],
        labels: [],
        dueDate: "",
        description: "",
        comments: [],
        groupKey: this.props.group.key,
      },
      showAddButton: false,
    };
    this.inputChange = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.MyComponent = this.MyComponent.bind(this);
    this.ShowAddCard = this.ShowAddCard.bind(this);
  }

  handleChange(event) {
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
  handleSubmit(event) {
    //add newCard into cards and update cards in Group
    event.preventDefault();
    if (this.state.newCard.value !== "") {
      this.props.group.cards = [...this.props.group.cards, this.state.newCard];
      //const tempCards = [...this.props.cards, this.state.newCard];
      this.props.onCardsChange();
      this.setState({
        newCard: {
          value: "",
          key: "",
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
  }

  /*
   * outside click handler
   */
  MyComponent() {
    const ShowAddCard = this.ShowAddCard;
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          this.setState({
            showAddButton: false,
          });
        }}
      >
        <ShowAddCard />
      </OutsideClickHandler>
    );
  }
  ShowAddCard() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Enter Text"
          ref={this.inputChange}
        ></input>
        {this.state.showAddButton && <button type="submit">Add</button>}
      </form>
    );
  }
  render() {
    const OutsideClickHandler = this.MyComponent;
    return <OutsideClickHandler />;
  }
}

export default NewCard;
