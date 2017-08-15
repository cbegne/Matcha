import React, { Component } from 'react';

class TextareaInput extends Component {

  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value.trim();
    this.props.onChange(name, value);
  }

  render() {
    const { currentValue, name } = this.props;

    return (
      <div className="">
        <label htmlFor={name}>
          <textarea
            className="form-control"
            defaultValue={currentValue}
            name={name}
            maxLength="1000"
            rows="6"
            cols="70"
            onChange={this.handleChange}
          />
        </label>
      </div>
    );
  }
}

export default TextareaInput;
