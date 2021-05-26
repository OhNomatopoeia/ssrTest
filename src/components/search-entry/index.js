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
					<div className="category">{this.props.post.category}</div>
					<div className="date">{this.props.post.date}</div>
				</div>
				<div className="post-description">
					<div className="post-title">{this.props.post.title}</div>
					<div className="post-link">{this.props.post.url}</div>
				</div>
			</a>
		);
	}
}

export default SearchEntry;
