import React, { Component } from "react";
import './Results.css'
import ResultCard from './ResultCard';
import ResultMeta from './ResultMeta';
import Pagination from "react-js-pagination";
import PropTypes from "prop-types";

class Results extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            sortOrder: 'default',
        };
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
    }

    getLowerExperience = (exp) => {
        if (exp === '')
            return 99;
        let resEx = exp.toLowerCase();
        let yrIndex = resEx.indexOf('yrs');
        let limits = [];
        if (yrIndex > 0) {
            resEx = resEx.slice(0, yrIndex);
        }
        if (resEx.toLowerCase().includes('fresher')) {
            limits = [0, 0];
        }
        else if (resEx.includes('-')) {
            limits = resEx.split('-').map(limit => limit.trim());
        }
        else if (resEx.includes('to')) {
            limits = resEx.split('to').map(limit => limit.trim());
        } else {
            limits = [resEx, resEx];
        }
        return parseInt(limits[0]);
    }

    handleSortChange = (sortOrder) => {
        switch (sortOrder) {
            case 'location':
                this.props.results.sort((a, b) => a.location.localeCompare(b.location));
                break;
            case 'experience':
                this.props.results.sort((a, b) => {
                    return this.getLowerExperience(a.experience.trim()) - this.getLowerExperience(b.experience.trim());
                });
                break;
            default:

                break;
        }
        this.setState({ sortOrder });
    }

    render() {
        let results = this.props.results;
        let startIndex = (this.state.activePage - 1) * 10;
        let endIndex = (this.state.activePage === Math.ceil(results.length / 10)) ? results.length : startIndex + 10;
        let resultsOnPage = results.slice(startIndex, endIndex);
        return (
            <div className="result-container">
                {results.length > 0 ? <ResultMeta count={results.length}
                    sortOrder={this.state.sortOrder} handleSorting={this.handleSortChange} /> : ''}
                {resultsOnPage.map(result => {
                    return <ResultCard key={result._id} result={result} />
                })}
                {results.length > 0 ? <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={results.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                /> : ''}
            </div>
        );
    }
}

Results.propTypes = {
    results: PropTypes.array.isRequired,
}

export default Results;
