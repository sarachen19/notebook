import React, { Component } from "react";
import { CardSourceBox } from "./cardSourceBox";

class AllCards extends Component {
  render() {
    const group = this.props.group;
    const cardsList = group.cards.map((card, index) => {
      return (
        <CardSourceBox
          key={index}
          index={index}
          card={card}
          group={group}
          onCardsChange={this.props.onCardsChange}
        />
      );
    });

    return <div>{cardsList}</div>;
  }
}

export default AllCards;
