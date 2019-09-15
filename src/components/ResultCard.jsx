import React, { Component } from "react";
import './ResultCard.css'
import { MdLocationOn } from "react-icons/md";
import { FaBriefcase, FaTools, FaRegMoneyBillAlt } from "react-icons/fa";
import PropTypes from "prop-types";

class ResultCard extends Component {
    render() {
        let result = this.props.result;
        return (
            <div className="result-card" key={result._id}>
                <h3><a href={result.applylink} target="__blank">{result.title}</a> {result.type !== '' ? ( <span className="sou-span">
                    <span className="text">| {result.type}</span>
                </span>) : ''}</h3>
                <h4>{result.companyname}
                    {result.source !== '' ? (<span className="sou-span"><label>via </label>{result.source}</span>) : ''}
                </h4>
                {result.experience !== '' ? (<span className="exp-span">
                    <FaBriefcase /><span className="text">{result.experience}</span>
                </span>) : ''}
                {result.location !== '' ? (<span className="loc-span">
                    <MdLocationOn /><span className="text">{result.location}</span>
                </span>) : ''}<br />
                {result.skills !== '' ? (<span className="ski-span">
                    <FaTools /><span className="text">{result.skills}</span>
                </span>) : ''}<br />
                {result.salary !== '' ? (<span className="sal-span">
                    <FaRegMoneyBillAlt /><span className="text">{result.salary}</span>
                </span>) : ''}
                

            </div>
        );
    }
}

ResultCard.propTypes = {
    result: PropTypes.object.isRequired,
}

export default ResultCard;
