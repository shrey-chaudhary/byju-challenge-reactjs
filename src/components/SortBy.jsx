import React, { Component } from "react";
import './SortBy.css';
import PropTypes from "prop-types";

class SortBy extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: 1
        };
    }

    handleChange = (e) => {
        let sortOrder = e.target.value;
        this.props.handleSorting(sortOrder);
    }

    render() {
        return (
            <div className="sort-by-container">
                <label>
                    Sort By
                </label>
                <select className="search-input" name="sortby" onChange={this.handleChange} placeholder="Search by Experience..." value={this.props.sortOrder}>
                    <option value="">Select sorting order</option>
                    <option value="location">Location</option>
                    <option value="experience">Experience</option>
                    {/* <option value="experience"></option> */}
                </select>
            </div>
        );
    }
}

SortBy.propTypes = {
    sortOrder: PropTypes.string.isRequired,
    handleSorting: PropTypes.func.isRequired,
}

export default SortBy;
