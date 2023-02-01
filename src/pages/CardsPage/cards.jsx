import React from "react";

import CreatingCard, { Card } from "../../entities";
import { Container } from "../../shared/ui/Wrapps";

const Cards = () => {
  return (
    <Container>
      <CreatingCard />
      <div className="cards">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </Container>
  );
};

export default Cards;
