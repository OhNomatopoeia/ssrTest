import React from "react";
import "./links.scss";

class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeIndex: 5,
			posts: {
				data: [],
				category: "",
				searchParams: this.props.searchParameter,
			},
			inputValue: "",
		};
	}

	onClick = (index, category, event) => {
		this.setState({ activeIndex: index });
		this.props.parentCallback(category);
		event.preventDefault();
	};

	render() {  
		  
		return (
			<div className="menu">
				<ul>
					<li className="link" onClick={(e) => this.onClick(5, "", e)}>
						<span className={this.state.activeIndex === 5 ? 'active-span' : 'link-span'}>All</span>
					</li>
					{this.props.menuItems.map((item, index) => (
						<li className="link" key={index} onClick={(e) => this.onClick(index, item.slug, e)}>
							<span className={this.state.activeIndex === (index) ? 'active-span' : 'link-span'} key={item.id}>{item.label}</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Menu;
