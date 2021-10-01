import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootswatch/dist/lux/bootstrap.min.css";
import axios from "axios";
import FlashCardList from "./components/FlashCardList";

const CATEGORY_URL = "https://opentdb.com/api_category.php";
const App = () => {
	// eslint-disable-next-line no-unused-vars
	const [flashCards, setFlashCards] = useState([]);
	//category
	const [categories, setCategories] = useState([]);

	//for category
	useEffect(() => {
		axios.get(CATEGORY_URL).then((res) => {
			setCategories(res.data.trivia_categories);
		});
	}, []);

	//for converting the html codes in api to actual character
	const decodeString = (str) => {
		const textArea = document.createElement("textarea");
		textArea.innerHTML = str;
		return textArea.value;
	};

	const categoryRef = useRef();
	const amountRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.get("https://opentdb.com/api.php", {
				params: {
					amount: amountRef.current.value,
					category: categoryRef.current.value,
				},
			})
			.then((res) => {
				setFlashCards(
					res.data.results.map((questionItem, index) => {
						const correctAnswer = decodeString(questionItem.correct_answer);
						const options = [
							...questionItem.incorrect_answers.map((str) => decodeString(str)),
							correctAnswer,
						];
						return {
							id: `${index}-${Date.now()}`,
							question: decodeString(questionItem.question),
							answer: correctAnswer,
							options: options.sort(() => Math.random - 0.5),
						};
					})
				);
			});
	};

	return (
		<>
			<form className="header" onSubmit={handleSubmit}>
				<div className="form-group">
					<label for="category">Category</label>
					<select class="form-select" id="category" ref={categoryRef}>
						{categories.map((category) => {
							return (
								<option value={category.id} key={category.id}>
									{category.name}
								</option>
							);
						})}
					</select>
				</div>
				<div className="form-group">
					<label for="number">Number of Question:</label>
					<input
						type="number"
						id="number"
						min="1"
						step="1"
						defaultValue={10}
						ref={amountRef}
					/>
				</div>
				<div className="form-group">
					<button className="button">Generate</button>
				</div>
			</form>
			<div class="container">
				<FlashCardList flashCards={flashCards} />
			</div>
		</>
	);
};

export default App;
