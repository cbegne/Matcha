import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import OneFilter from '../components/OneFilter.js';
import Tags from '../../Profile/MyProfile/components/MyTags.js';

class Filter extends Component {

  state = { }
  age = [18, 130];
  distance = [0, 500];
  popularity = [0, 10000];
  tags = [];
  suggestions = [];

  filterAge = (value) => { this.age = value; }

  filterDistance = (value) => { this.distance = value; }

  filterPopularity = (value) => { this.popularity = value; }

  filterTags = (value) => { this.tags = value; }

  changeSuggestions = () => {
    const { age, distance, popularity, tags } = this;
    this.props.onSubmit({ age, distance, popularity, tags });
  }

  render() {
    const { selection } = this.props;
    const { age, distance, popularity, tags } = selection;
    const marksAge = {
      18: 18,
      25: 25,
      30: 30,
      40: 40,
      50: 50,
      60: 60,
      75: 75,
      100: '> 100 ans',
    };
    const marksDistance = {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      50: 50,
      100: 100,
      200: '> 200 km',
    };
    const marksPopularity = {
      0: 'Bronze',
      50: 'Argent',
      100: 'Or',
      500: 'Diamant',
    };
    const ageSlider = (<OneFilter
      name="age"
      onChange={this.filterAge}
      marks={marksAge}
      min={18}
      max={100}
      defaultValue={age}
    />);
    const distanceSlider = (<OneFilter
      name="distance"
      onChange={this.filterDistance}
      marks={marksDistance}
      min={0}
      max={200}
      defaultValue={distance}
    />);
    const popularitySlider = (<OneFilter
      name="popularity"
      onChange={this.filterPopularity}
      marks={marksPopularity}
      min={0}
      max={500}
      defaultValue={popularity}
    />);
    const tagsFilter = (<Tags
      suggestions={this.suggestions}
      tags={tags}
      onAddOrDelete={this.filterTags}
    />);
    const tab = [
      { title: 'Age', filter: ageSlider },
      { title: 'Distance', filter: distanceSlider },
      { title: 'Popularity', filter: popularitySlider },
      { title: 'Tags', filter: tagsFilter },
    ];
    const show = tab.map(data => (
      <div key={data.title} className="slider-container row">
        <div className="slider-title col-lg-1"><b>{data.title}</b></div>
        {data.filter}
      </div>
    ));

    return (
      <div className="filter-search">
        <button className="advanced-search" onClick={() => this.setState({ open: !this.state.open })}>
          <div>Recherche avancée</div>
          <div className="fa fa-arrow-circle-down" />
        </button>
        <Collapse in={this.state.open}>
          <div className="">
            {show}
            <button className="btn btn-default" onClick={this.changeSuggestions}>
              Mettre à jour
            </button>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default Filter;
