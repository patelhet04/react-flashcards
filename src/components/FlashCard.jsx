import React, { useState, useRef, useEffect } from "react";

const FlashCard = ({ flashCard }) => {
	const [flip, setFlip] = useState(false);
	// const [height, setHeight] = useState("initial");
	//if want to change the height of card dynamically
	//start
	// const frontRef = useRef();
	// const backRef = useRef();
	// const setMaxHeight = () => {
	// 	const frontHeight = frontRef.current.getBoundingClientRect().height;
	// 	const backHeight = backRef.current.getBoundingClientRect().height;
	// 	setHeight(Math.max(frontHeight, backHeight, 100));
	// };
	// useEffect(setMaxHeight, [
	// 	flashCard.question,
	// 	flashCard.answer,
	// 	flashCard.options,
	// ]);
	// useEffect(() => {
	// 	window.addEventListener("resize", setMaxHeight);
	// 	return () => window.removeEventListener("resize", setMaxHeight);
	// }, []); //finish
	return (
		<div
			className={`card mb-3 ${flip ? "flip" : " "}`}
			// style={{ height: height }}
			onClick={() => setFlip(!flip)}
		>
			<div className="card-front">
				{flashCard.question}
				<div className="flashcard-options">
					<ul>
						{flashCard.options.map((option) => {
							return (
								<li className="flashcard-option" id={option}>
									{option}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="card-back">{flashCard.answer}</div>
		</div>
	);
};

export default FlashCard;
