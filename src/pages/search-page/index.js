import React from "react";
import Menu from "../../components/menu";
import SearchBar from "../../components/search-bar";
import SearchEntry from "../../components/search-entry";
import ReactPaginate from "react-paginate";
import "./search-page.scss";

class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			menu: [],
			posts: [],
			offset: 0,
			perPage: 10,
			currentPage: 0,
			totalPosts: 0,
			searchParam: "",
		};
	}

	componentDidMount() {
		this.getInfo();
	}

	handleCallback = (searchData) => {
		this.setState({ searchParam: searchData.entry });
		this.setState({ searchFilter: searchData.filter });
		this.postsTreatment(searchData.data);
	};

	getInfo() {
		fetch("https://cms.talkdesk.com/wp-json/external/globalsearch")
			.then((res) => res.json())
			.then(
				(result) => {
					this.postsTreatment(result);
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
	}

	getSearchInfo() {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				category: "",
				keyword: this.state.searchParam,
				page: this.state.currentPage + 1,
				posts_per_page: 10,
			}),
		};
		fetch(
			"https://cms.talkdesk.com/wp-json/web-api/v1/content/search",
			requestOptions
		)
			.then((res) => res.json())
			.then(
				(result) => {
					this.postsTreatment(result.data);
				},
				(error) => {
					this.setState({
						isLoaded: true,
						error,
					});
				}
			);
	}

	postsTreatment(result) {
		let posts = result.list ? result.list : result.posts;
		let slice = posts.slice(
			this.state.offset,
			this.state.offset + this.state.perPage
		);
		if (result.list) {
			slice = result.list;
		}
		const numberOfPosts = result.count_per ? result.count_per : posts.length;
		const postData = slice.map((post) => <SearchEntry post={post} />);
		this.setState({
			totalPosts: numberOfPosts,
			isLoaded: true,
			menu: result.menu,
			pageCount: Math.ceil(numberOfPosts / this.state.perPage),
			postData,
		});
	}

	handlePageClick = (e) => {
		const selectedPage = e.selected;
		const offset = selectedPage * this.state.perPage;
		this.setState(
			{
				currentPage: selectedPage,
				offset: offset,
			},
			() => {
				if (this.state.searchParam) {
					this.getSearchInfo();
				} else {
					this.getInfo();
				}
			}
		);
	};

	render() {
		const { error, isLoaded, menu } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<>
					<div className="search-page">
						<SearchBar parentCallback={this.handleCallback} />
						<div className="posts-container">
							<Menu menuItems={menu} parentCallback={this.handleCallback} />
							<div className="posts">
								<div>
									Showing {this.state.totalPosts} results{" "}
									{this.state.searchParam
										? 'for "' + this.state.searchParam + '"'
										: ""}
								</div>
								{this.state.postData}
								<ReactPaginate
									previousLabel={"prev"}
									nextLabel={"next"}
									breakLabel={"..."}
									breakClassName={"break-me"}
									pageCount={this.state.pageCount}
									marginPagesDisplayed={2}
									pageRangeDisplayed={4}
									onPageChange={this.handlePageClick}
									containerClassName={"pagination"}
									subContainerClassName={"pages pagination"}
									activeClassName={"active"}
								/>
							</div>
						</div>
					</div>
				</>
			);
		}
	}
}

export default SearchPage;
