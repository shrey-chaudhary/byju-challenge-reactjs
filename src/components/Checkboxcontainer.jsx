import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import './Checkboxcontainer.css';

class CheckboxContainer extends React.Component {
  constructor(props) {
    super(props);
    let checkedItems = new Map();
    this.props.selected.forEach(element => {
        checkedItems.setItem(element,true);
    });
    this.state = {
      checkedItems,
    }

  }

  handleChange = (e) => {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  render() {
    return (
      <div className="checkbox-container">
        { 
          this.props.checkboxes.map(item => (
            <label key={item}>
              <Checkbox name={item} checked={this.state.checkedItems.get(item)} onChange={this.handleChange} />
              {item}
            </label>
          ))
        }
      </div>
    );
  }
}

CheckboxContainer.propTypes = {
    checkboxes: PropTypes.array.isRequired,
    selected: PropTypes.array.isRequired,
}

export default CheckboxContainer;
