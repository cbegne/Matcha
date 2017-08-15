import axios from 'axios';
import React, { Component } from 'react';

import Loading from '../../General/components/Loading.js';
import Suggestions from '../components/Suggestions.js';
import Sort from '../components/Sort.js';
import Filter from './Filter.js';
import '../css/gallery.css';

class GalleryContainer extends Component {

  state = {
    gallery: [],
    galleryFilter: [],
    filter: false,
    error: '',
    loaded: false,
    orderAge: 'down',
    orderDistance: 'down',
    orderTags: 'down',
    orderPopularity: 'down',
    age: [18, 130],
    distance: [0, 500],
    popularity: [0, 10000],
    tags: [],
  };

  componentDidMount() {
    const { age, distance, popularity, tags } = this.state;
    const selection = Object.assign({}, { age }, { distance }, { popularity }, { tags });
    this.getGallery(selection);
  }

  getGallery = (selection) => {
    const url = '/api/get_gallery';
    axios.post(url, selection)
    .then(({ data }) => {
      const { success, error } = data;
      if (success === true) {
        const { gallery, age, distance, popularity, tags } = data;
        this.setState({ gallery, age, distance, popularity, tags, loaded: true });
      } else {
        this.setState({ error });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  filter = (research) => {
    const { age, distance, popularity, tags } = research;
    const { gallery } = this.state;
    if (age[1] === 100) { age[1] = 130; }
    if (distance[1] === 200) { distance[1] = 500; }
    if (popularity[1] === 500) { popularity[1] = 10000; }
    const galleryFilter = gallery.filter((profile) => {
      if (profile.age >= age[0] && profile.age <= age[1]
        && profile.distance >= distance[0] && profile.distance <= distance[1]
        && profile.popularity >= popularity[0] && profile.popularity <= popularity[1]
        ) {
        const profileTags = profile.tags.map(tag => tag.text);
        if (tags.length === 0 ||
          tags.every(tag => profileTags.includes(tag.text)) === true) {
          return true;
        }
      }
      return false;
    });
    this.setState({ filter: true, galleryFilter, age, distance, tags, popularity });
  }

  sortAge = (userA, userB) => (userA.age - userB.age)

  sortAgeReverse = (userA, userB) => (userB.age - userA.age)

  sortDistance = (userA, userB) => (userA.distance - userB.distance)

  sortDistanceReverse = (userA, userB) => (userB.distance - userA.distance)

  sortTags = (userA, userB) => (-userA.nbCommonTags + userB.nbCommonTags)

  sortTagsReverse = (userA, userB) => (-userB.nbCommonTags + userA.nbCommonTags)

  sortPopularity = (userA, userB) => (-userA.popularity + userB.popularity)

  sortPopularityReverse = (userA, userB) => (-userB.popularity + userA.popularity)

  sort = (elem) => {
    const {
      gallery,
      galleryFilter,
      filter,
      orderAge,
      orderDistance,
      orderTags,
      orderPopularity,
    } = this.state;
    const galleryToDisplay = (filter === false) ? gallery : galleryFilter;
    switch (elem) {
      case 'age':
        if (orderAge === 'down') {
          galleryToDisplay.sort(this.sortAge);
          this.setState({ gallery, orderAge: 'up' });
        } else {
          galleryToDisplay.sort(this.sortAgeReverse);
          this.setState({ gallery, orderAge: 'down' });
        }
        break;
      case 'distance':
        if (orderDistance === 'down') {
          galleryToDisplay.sort(this.sortDistance);
          this.setState({ gallery, orderDistance: 'up' });
        } else {
          galleryToDisplay.sort(this.sortDistanceReverse);
          this.setState({ gallery, orderDistance: 'down' });
        }
        break;
      case 'tags':
        if (orderTags === 'down') {
          galleryToDisplay.sort(this.sortTags);
          this.setState({ gallery, orderTags: 'up' });
        } else {
          galleryToDisplay.sort(this.sortTagsReverse);
          this.setState({ gallery, orderTags: 'down' });
        }
        break;
      case 'popularity':
        if (orderPopularity === 'down') {
          galleryToDisplay.sort(this.sortPopularity);
          this.setState({ gallery, orderPopularity: 'up' });
        } else {
          galleryToDisplay.sort(this.sortPopularityReverse);
          this.setState({ gallery, orderPopularity: 'down' });
        }
        break;
      default:
    }
  }

  render() {
    const {
      loaded,
      error,
      gallery,
      galleryFilter,
      filter,
      age,
      distance,
      popularity,
      tags,
    } = this.state;
    const selection = Object.assign({}, { age }, { distance }, { popularity }, { tags });

    if (loaded === false) { return <Loading />; }
    if (error) { return <div>{error}</div>; }
    return (
      <div className="suggestions-container">
        <h2 className="title-likes">Suggestions</h2>
        <Filter gallery={gallery} onSubmit={this.filter} selection={selection} />
        <Sort onClick={this.sort} />
        <Suggestions gallery={gallery} galleryFilter={galleryFilter} filter={filter} />
      </div>
    );
  }
}

export default GalleryContainer;
