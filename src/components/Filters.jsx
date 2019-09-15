import React, { Component } from 'react';
import './Filters.css'
import PropTypes from 'prop-types';
import Checkboxcontainer from './Checkboxcontainer'


class Filters extends Component {

    constructor(props) {
        super(props);
        this.Filters = React.createRef();
      }

      handleApplyFilters = (e) => {
        let checkedItems = this.Filters.current.state.checkedItems;
        checkedItems = Array.from(checkedItems).filter(([key,val]) => {
            return val;
        }).map(([key, val]) => key);

        this.props.handleApplyFilters(e, checkedItems);
    }

    render() {
        
        return (
            <div className="filter-div">
                <h3 className="title-filter">Filters</h3>
                <div className="filter-container">
                    <label>Company</label>
                    <Checkboxcontainer ref={this.Filters} selected={this.props.companyFilter} checkboxes={this.props.companies}/>
                </div>
                <button className="apply-filt" name="filters" onClick={this.handleApplyFilters}>Apply</button>
            </div>
        );
    }
}

Filters.propTypes = {
    companyFilter: PropTypes.array.isRequired,
    companies: PropTypes.array.isRequired,
    handleApplyFilters: PropTypes.func.isRequired,
}

export default Filters;
