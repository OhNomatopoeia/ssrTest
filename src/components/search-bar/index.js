import React from "react";

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: {
        data:[],
        entry:''
      },
			inputValue: "",
		};
	}

	searchRequest(keyword) {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				category: "",
				keyword: keyword,
				page: 1,
				posts_per_page: 10,
			}),
		};
		fetch(
			"https://cms.talkdesk.com/wp-json/web-api/v1/content/search",
			requestOptions
		).then((res) => res.json())
    .then((result) => {
			this.setState({
				posts: {
          data: result.data,
          entry: keyword
        },
			});
			this.props.parentCallback(this.state.posts );
		});
	}

	updateInputValue(evt) {
		this.setState({
			inputValue: evt.target.value,
		});
	}

	onTrigger = (event) => {
		this.searchRequest(this.state.inputValue);
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
