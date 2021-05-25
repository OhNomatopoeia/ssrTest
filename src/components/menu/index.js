import React from "react";
import "./links.scss";

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: {
				data: [],
				category: "",
				searchParams: this.props.searchParameter
			},
			inputValue: "",
		};
	}
	
	onClick = (category, event) => {
		this.props.parentCallback(category);
		event.preventDefault();
	};

	render() {
		return (
			<div className="menu">
				<a className="link" onClick={(e) => this.onClick('', e)}>
					All
				</a>
				{this.props.menuItems.map((item) => (
					<a className="link" onClick={(e) => this.onClick(item.slug, e)}>
						<div key={item.id}>{item.label}</div>
					</a>
				))}
			</div>
		);
	}
}

export default Menu;
