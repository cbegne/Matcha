import React, { Component } from 'react';

class TextInputDate extends Component {

  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value.trim();
    this.props.onChange(name, value);
  }

  render() {
    const { currentValue, name, type, text } = this.props;

    return (
      <div className="form-inline form-myprofile-date">
        <label htmlFor={name} className="input-label">{text}</label>
        <input
          className="form-control"
          defaultValue={currentValue}
          name={name}
          type={type}
          onChange={this.handleChange}
        />
        <small> jj/mm/aaaa</small><br />
      </div>
    );
  }
}

export default TextInputDate;
