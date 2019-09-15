import React, { Component } from "react";
import './SearchForm.css';
import { FaSearch } from 'react-icons/fa';

import PropTypes from "prop-types";

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: '',
            location: '',
            exp: '',
        };
    }

    onInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onFormSubmit = e => {
        this.props.onFormSubmit(e, this.state.skill.toLowerCase(), this.state.location.toLowerCase(), this.state.exp.toLowerCase());
    }
    render() {
        return (
            <span className="search-form">
                <input className="search-input" type="text" name="skill" placeholder="Search by Skill..." value={this.state.skill} onChange={this.onInputChange} />
                <input className="search-input" type="text" name="location" placeholder="Search by Location..." value={this.state.location} onChange={this.onInputChange} />
                {/* <input className="search-input" type="text" name="exp" placeholder="Search by Experience..." value={this.state.exp} onChange={this.onInputChange} /> */}
                <select className="search-input" name="exp" placeholder="Search by Experience..." value={this.state.exp} onChange={this.onInputChange} >
                    <option value="">Select Experience</option>
                    {[...Array(26)].map((year, index) => {
                        return (<option key={index} value={index}>{index} years</option>);
                    })}

                </select>
                <button className="search-btn" type="submit" name="search" onClick={this.onFormSubmit}><FaSearch /></button>
            </span>
        );
    }
}

SearchForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
}

export default SearchForm;
