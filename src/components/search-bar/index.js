import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inputValue: "",
		};
	}

	updateInputValue(evt) {
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
				<form onSubmit={this.onTrigger}>
					<input
						type="text"
						name="search"
						placeholder="Search"
						value={this.state.inputValue}
						onChange={(evt) => this.updateInputValue(evt)}
					/>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default SearchBar;
