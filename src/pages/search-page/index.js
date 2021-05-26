import React from "react";
import Menu from "../../components/menu";
import SearchBar from "../../components/search-bar";
import SearchEntry from "../../components/search-entry";
import ReactPaginate from "react-paginate";
import "./search-page.scss";
import emptyState from "./empty-state-c.png";

const MOBILE_WIDTH = 992;

class SearchPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			isLoadedResults: true,
			menu: [],
			posts: [],
			offset: 0,
			perPage: 10,
			currentPage: 0,
			totalPosts: 0,
			searchInput: "",
			filter: "",
		};
	}
	handleResize = (e) => {
		this.setState({ windowWidth: window.innerWidth });
	};

	componentDidMount() {
		window.addEventListener("resize", this.handleResize);
		this.getInfo();
	}

	componentWillUnmount() {
		window.addEventListener("resize", this.handleResize);
	}

	handleCallbackSearch = (searchInput) => {
		this.setState({ searchInput });
		this.setState({ filter: "" });
		this.getSearchInfo(searchInput, "");
	};

	handleCallbackFilter = (filter) => {
		this.setState({ filter });
		this.getSearchInfo(this.state.searchInput, filter);
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

	getSearchInfo(searchInput, filter) {
		this.setState({
			isLoadedResults: false,
		});
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				category: filter,
				keyword: this.state.searchInput ? this.state.searchInput : searchInput,
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
			isLoadedResults: true,
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
				if (this.state.searchInput) {
					this.getSearchInfo();
				} else {
					this.getInfo();
				}
			}
		);
	};

	render() {
		const {
			error,
			isLoaded,
			menu,
			windowWidth,
			pageCount,
			currentPage,
			isLoadedResults,
			totalPosts,
		} = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return (
				<div className="loading">
					<div class="snippet" data-title=".dot-shuttle">
						<div class="stage filter-contrast">
							<div class="dot-shuttle"></div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<>
					<div>
						<div className="search-page">
							<SearchBar parentCallback={this.handleCallbackSearch} />
							{totalPosts === 0 ? (
								<div className="posts-container">
									<div className="no-results">
										<div className="no-results-text">
											<h2 className="no-results-title">Haven't found what you are looking for?</h2>
											<p className="no-results-subtitle">Please give it another try!</p>
										</div>
										<img
											className="no-results-image"
											src={emptyState}
											alt="Logo"
										/>
									</div>
								</div>
							) : (
								<div className="posts-container">
									<Menu
										menuItems={menu}
										searchParameter={this.state.searchInput}
										parentCallback={this.handleCallbackFilter}
									/>
									{isLoadedResults ? (
										<div className="posts">
											<div className="post-count">
												Showing {this.state.totalPosts} results{" "}
												{this.state.searchInput
													? 'for "' + this.state.searchInput + '"'
													: ""}
											</div>
											{this.state.postData}
											<ReactPaginate
												previousLabel={"<"}
												nextLabel={">"}
												breakLabel={
													windowWidth < MOBILE_WIDTH
														? "Page " + (currentPage + 1) + " / " + pageCount
														: "..."
												}
												breakClassName={"break-me"}
												pageCount={pageCount}
												marginPagesDisplayed={
													windowWidth < MOBILE_WIDTH ? -1 : 1
												}
												pageRangeDisplayed={windowWidth < MOBILE_WIDTH ? 0 : 4}
												onPageChange={this.handlePageClick}
												containerClassName={"pagination"}
												subContainerClassName={"pages pagination"}
												activeClassName={"active"}
											/>
										</div>
									) : (
										<div className="posts">
											<div class="snippet" data-title=".dot-shuttle">
												<div class="stage filter-contrast">
													<div class="dot-shuttle"></div>
												</div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					</div>
				</>
			);
		}
	}
}

export default SearchPage;
