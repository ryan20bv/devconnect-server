import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubByNameAction } from "../../../redux/actions/profileAction.js";
import GithubRepos from "./GithubRepos.jsx";

const Github = ({ githubusername, profileState, getGithubByNameAction }) => {
	useEffect(() => {
		getGithubByNameAction(githubusername);
	}, [getGithubByNameAction]);
	const { error, repos } = profileState;
	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>
				<i className='fab fa-github'></i> Github Repos
			</h2>

			{error === null ? (
				repos.error || repos.length === 0 ? (
					<h1>{repos.error.msg}</h1>
				) : (
					<React.Fragment>
						{repos.map((repo) => (
							<GithubRepos key={repo.id} repo={repo} />
						))}
					</React.Fragment>
				)
			) : (
				<React.Fragment>
					<h1>{error.msg}</h1>
				</React.Fragment>
			)}
		</div>
	);
};

Github.propTypes = {
	// githubusername: PropTypes.string.isRequired,
	getGithubByNameAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
	return {
		profileState: state.profileReducer,
	};
};

export default connect(mapStateToProps, { getGithubByNameAction })(Github);
