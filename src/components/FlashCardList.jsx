import React from "react";
import FlashCard from "./FlashCard";

const FlashCardList = ({ flashCards }) => {
	return (
		<div class="row mt-5">
			<div className="card-grid">
				{flashCards.map((flashCard) => {
					return <FlashCard flashCard={flashCard} key={flashCard.id} />;
				})}
			</div>
		</div>
	);
};

export default FlashCardList;
