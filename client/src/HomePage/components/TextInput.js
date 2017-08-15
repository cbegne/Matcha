import React, { Component } from 'react';

class TextInput extends Component {

  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value.trim();
    this.props.onChange(name, value);
  }

  render() {
    const { defaultValue, name, placeholder, type, className } = this.props;

    return (
      <div className={className}>
        <input
          className="form-control"
          defaultValue={defaultValue}
          name={name}
          type={type}
          onChange={this.handleChange}
          placeholder={placeholder}
          required
        />
      </div>
    );
  }
}

export default TextInput;
