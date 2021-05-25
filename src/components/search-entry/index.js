import React from "react";
import "./entry.scss";

class SearchEntry extends React.Component {
	constructor(props) {
		super(props);
	}


	render() {

		return (
			<a href = {'https://www.talkdesk.com'+ this.props.post.url} className="post">
				<div className="post-info">
					<span className="category">{this.props.post.category}</span>
					<span className="date">{this.props.post.date}</span>
				</div>
				<div className="post-title">{this.props.post.title}</div>
				<div className="post-url">{this.props.post.url}</div>
			</a>
		);
	}
}

export default SearchEntry;
