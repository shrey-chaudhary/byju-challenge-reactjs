import React, { Component } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import Filters from './components/Filters';
import Results from './components/Results';

const URL = `https://nut-case.s3.amazonaws.com/jobs.json`;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            count: 0,
            companyFilter: [],
            filteredResults: [],
        };
    }

    searchLocation = (userLocation, result) => {
        userLocation = userLocation.toString().split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
        var location = [result.location.toLowerCase()];
        if (location[0].includes(',')) {
            location = location[0].split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
        }
        return location.some(loc => {
            let flag = false;
            userLocation.forEach(userLoc => {
                if (loc.trim().includes(userLoc.trim()))
                    flag = true;
            });
            return flag;
        });
    }

    searchSkill = (userSkill, result) => {
        userSkill = userSkill.toString().split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
        var skill = [result.skills.toLowerCase()];
        if (skill[0].includes(',')) {
            skill = skill[0].split(',').filter((e) => { return e.trim().length > 0; }).map((e) => e.trim());
        }
        return skill.some(sk => {
            let flag = false;
            userSkill.forEach(userSk => {
                if (sk.trim().includes(userSk.trim()))
                    flag = true;
            });
            return flag;
        });
    }

    searchExp = (userExp, result) => {
        let lower = -1;
        let upper = -1;
        let resEx = result.experience.toLowerCase();
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
        lower = parseInt(limits[0]);
        upper = parseInt(limits[1]);
        if (userExp >= lower && userExp <= upper) {
            return true;
        } else {
            return false;
        }
    }

    onFormSubmit = (e, userSkill, userLocation, userExp) => {
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                let results = data.data;
                if (userLocation.length > 0) {
                    results = results.filter(result => {
                        return this.searchLocation(userLocation, result);
                    });
                }

                if (userSkill.length > 0) {
                    results = results.filter(result => {
                        return this.searchSkill(userSkill, result);
                    });
                }

                if (userExp.length > 0) {
                    results = results.filter(result => {
                        if (result.experience.length <= 0) return false;
                        return this.searchExp(userExp, result);
                    });
                }

                console.log(results);
                this.setState({ results, filteredResults: results, count: results.length, companyFilter: []})
            })
            .catch(err => console.log(err));
    }
    handleApplyFilters = (e, checkedFilters) => {

        let filteredResults = this.state.results;
        filteredResults = filteredResults.filter(result => {
            if (checkedFilters.length === 0 || checkedFilters.includes(result.companyname)) return true;
            return false;
        })
        this.setState({ companyFilter: checkedFilters, filteredResults, count: filteredResults.length, });
    }
    render() {
        return (
            <div className="App" >
                <header className="App-header" >
                    <span className="header-label">Job Search Portal</span>
                    <SearchForm onFormSubmit={this.onFormSubmit}>
                    </SearchForm>
                </header>
                <div className="grid-container">
                    {this.state.results.length > 0 ? (<Filters companyFilter={this.state.companyFilter} companies={[...new Set(this.state.results.map(result => result.companyname))]} handleApplyFilters={this.handleApplyFilters} />) : ''}
                    <Results results={this.state.filteredResults} />
                </div>

            </div>
        );
    }

}

export default App;