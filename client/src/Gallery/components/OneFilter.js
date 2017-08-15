import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

class OneFilter extends Component {

  handleChange = (value) => {
    this.props.onChange(value);
  }

  render() {
    const { marks, min, max, defaultValue } = this.props;
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);

    return (
      <div className="slider">
        <Range
          min={min}
          max={max}
          onChange={this.handleChange}
          marks={marks}
          defaultValue={defaultValue}
          tipFormatter={value => `${value}`}
        />
      </div>
    );
  }
}

export default OneFilter;
