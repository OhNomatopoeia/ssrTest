import React from "react";

class Menu extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="menu">
				{this.props.menuItems.map((item) => (
					<div key={item.id}>
						<a href="/">{item.label}</a>
					</div>
				))}
			</div>
		);
	}
}

export default Menu;
