import React, { Component } from 'react';
import './ResultMeta.css';
import SortBy from './SortBy';
import PropTypes from 'prop-types';

class ResultMeta extends Component {
    onFilterClick = (e) => {
        if (!this.state.showFilters)
            this.setState({ showFilters: true });
        else
            this.setState({ showFilters: false });
    }

    

    render() {
        return (
            <div className="result-meta">
                <span className="count-label">Found {this.props.count} Jobs</span>
                <SortBy sortOrder={this.props.sortOrder} handleSorting={this.props.handleSorting}/>
            </div>
        );
    }
}

ResultMeta.propTypes = {
    count: PropTypes.number.isRequired,
    sortOrder: PropTypes.string.isRequired,
    handleSorting: PropTypes.func.isRequired,
}

export default ResultMeta;
