import React, { Component } from 'react';

class TextInputDate extends Component {

  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value.trim();
    this.props.onChange(name, value);
  }

  render() {
    const { defaultValue, name, placeholder, type } = this.props;

    return (
      <div className="form-inline size-form-signup">
        <input
          className="form-control"
          defaultValue={defaultValue}
          name={name}
          type={type}
          onChange={this.handleChange}
          placeholder={placeholder}
          required
        />
        <small> jj/mm/aaaa</small><br />
      </div>
    );
  }
}

export default TextInputDate;
