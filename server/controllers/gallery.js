import geolib from 'geolib';
import moment from 'moment';
import * as Control from '../tools/usersControl.js';
import * as Filter from '../tools/usersFilters.js';
import * as Getter from '../getters/getUsers.js';
import * as User from '../tools/usersTools.js';

const checkPopularity = (userA, userB) => {
  const popularityA = userA.popularity;
  const popularityB = userB.popularity;
  if (popularityA > popularityB) {
    return -1;
  } else if (popularityA < popularityB){
    return 1;
  }
  return 0;
}

const checkTags = (userA, userB) => {
  const nbTagsA = userA.nbCommonTags;
  const nbTagsB = userB.nbCommonTags;
  if (nbTagsA > nbTagsB) {
    return -1;
  } else if (nbTagsA < nbTagsB){
    return 1;
  }
  return checkPopularity(userA, userB);
}

const sortUsers = (userA, userB) => {
  const distanceSlotA = Filter.distanceSlot(userA.distance);
  const distanceSlotB = Filter.distanceSlot(userB.distance);
  if (distanceSlotA > distanceSlotB) {
    return -1;
  } else if (distanceSlotA < distanceSlotB){
    return 1;
  }
  return checkTags(userA, userB);
}

const compatibleUsers = (profile, users) => {
  const geolocationLoggedUser = profile.geolocation;
  const tagsLoggedUser = profile.tags.map((tag) => (tag.text));
  users.forEach((user) => {
    const { geolocation, tags, likedBy } = user;
    const distance = geolib.getDistance(geolocationLoggedUser, geolocation) / 1000;
    user.distance = Math.round(distance);
    let nbCommonTags = 0;
    if (tags) {
      tags.forEach((tag) => {
        if (tagsLoggedUser.includes(tag.text)) {
          nbCommonTags++;
        }
      });
    }
    user.nbCommonTags = nbCommonTags;
  });
  return users;
}

const userBiFilter = async (gender, blockedFilter) => {
  if (gender === 'female') {
    const partOne = await Getter.allUsersSuggested([ 'female' ], [ 'Homosexuel', 'Bisexuel' ], blockedFilter);
    const partTwo = await Getter.allUsersSuggested([ 'male' ], [ 'Hétérosexuel', 'Bisexuel' ], blockedFilter);
    return partOne.concat(partTwo);
  }
  const partOne = await Getter.allUsersSuggested([ 'male' ], [ 'Homosexuel', 'Bisexuel' ], blockedFilter);
  const partTwo = await Getter.allUsersSuggested([ 'female' ], [ 'Hétérosexuel', 'Bisexuel' ], blockedFilter);
  return partOne.concat(partTwo);
}

const gallery = async (req, res) => {
  const { age, distance, tags, popularity } = req.body;
  const login = User.getLoggedUser(req);
  let profile = await Getter.getUser({ field: 'login', value: login });
  if (!profile) {
    return res.send({ success: false, error: 'Identification impossible.' });
  }
  const { gender, orientation, blockes, blockedBy } = profile;
  const genderSearch = Filter.gender({ gender, orientation });
  const orientationSearch = Filter.orientation({ orientation });
  const blockedFilter = blockes.concat(blockedBy, login);
  let users;
  if (orientation === 'Bisexuel') {
    users = await userBiFilter(gender, blockedFilter, tags, popularity);
  } else {
    users = await Getter.allUsersSuggested(genderSearch, orientationSearch, blockedFilter);
  }
  users = compatibleUsers(profile, users);
  users.sort(sortUsers);
  const usersFilterAndAge = users.map(profile => {
    const date = moment(profile.birthDate);
    const age = -date.diff(moment(), 'years');
    profile.age = age;
    return profile;
  });
  res.send({ success: true, gallery: usersFilterAndAge, age, distance, tags, popularity, error: '' });
};

export default gallery;
