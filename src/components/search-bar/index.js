import React from "react";
import "./search-bar.scss";


class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: "",
			
		};
	}

	updateInputValue(evt) {
		document.getElementById("search-button").style.display="unset";
		this.setState({
			inputValue: evt.target.value,
		});
	}
	
	onTrigger = (event) => {
		this.props.parentCallback(this.state.inputValue);
		event.preventDefault();
	};

	render() {
		return (
			<div>
				<form className="form-wrapper" onSubmit={this.onTrigger}>
					<input
						type="text"
						name="search"
						placeholder="Type to search"
						className="search-input"
						value={this.state.inputValue}
						onChange={(evt) => this.updateInputValue(evt)}
					/>
					<button type="submit" value="Submit" className="search-button" id="search-button">Search</button>
				</form>
			</div>
		);
	}
}

export default SearchBar;
