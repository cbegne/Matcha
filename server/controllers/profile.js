import * as Control from '../tools/usersControl.js';
import * as Getter from '../getters/getUsers.js';
import * as TagGetter from '../getters/getTags.js';
import * as Updater from '../updaters/updateInteractions.js';
import * as UserUpdater from '../updaters/updateUsers.js';
import * as User from '../tools/usersTools.js';

const getMyProfile = async (req, res) => {
  const login = User.getLoggedUser(req);
  let profile = await Getter.getUser({ field: 'login', value: login });
  if (!profile) {
    return res.send({ success: false, error: 'Cet utilisateur n\'existe pas.' });
  }
  profile = Control.filterProfileData(profile, login);
  return res.send({ success: true, profile, error: '' });
};

// get profile requested in url and add a visit when visiting one profile + get suggestions for tags
const getProfile = async (req, res) => {
  const { login } = req.params;
  const loggedUser = User.getLoggedUser(req);
  const profileLoggedUser = await Getter.getUser({ field: 'login', value: loggedUser });
  const { blockedBy } = profileLoggedUser;
  let profile;
  if (login !== loggedUser) {
    profile = await Getter.getUserExclBlocked(login, blockedBy);
    if (!profile) {
      return res.send({ success: false, error: 'Cet utilisateur n\'existe pas ou est bloqué ou a fermé son compte.' });
    }
    profile = Control.filterProfileData(profile, loggedUser);
  } else {
    profile = profileLoggedUser;
  }
  const { profilePic, reportsAsFake, blockes } = profileLoggedUser;
  if (login !== loggedUser && !reportsAsFake.includes(login) && !blockes.includes(login)) {
    Updater.addVisit({ loggedUser, req });
  }
  const loggedUserAndPic = { login: loggedUser, profilePic };
  const tagsSuggestions = await TagGetter.getTagsSuggestions();
  return res.send({
    success: true,
    profile,
    loggedUser: loggedUserAndPic,
    tagsSuggestions,
    error: '',
  });
};

const getVisitsOrLikesProfiles = async (loginsArrayOfObj, blockedFilter) => {
  const logins = loginsArrayOfObj.map(elem => (elem.login));
  logins.reverse();
  const loginsOnce = logins.filter((login, index, self) => (
    index === self.indexOf(login)
  ));
  loginsOnce.reverse();
  const profiles = await Getter.getProfilesIn(loginsOnce, blockedFilter);
  const profilesRecentFirst = [];
  loginsOnce.forEach((login) => {
    if (blockedFilter.includes(login) === false) {
      const index = profiles.findIndex(profile => profile.login === login);
      profilesRecentFirst.unshift(profiles[index]);
    }
  });
  return profilesRecentFirst;
};

const getMatchesProfiles = async (loginsArray, blockedFilter) => {
  const profiles = await Getter.getProfilesIn(loginsArray, blockedFilter);
  const profilesRecentFirst = [];
  loginsArray.forEach((login) => {
    if (blockedFilter.includes(login) === false) {
      const index = profiles.findIndex(profile => profile.login === login);
      profilesRecentFirst.unshift(profiles[index]);
    }
  });
  return profilesRecentFirst;
};

const getVisitsOrLikesOrMatches = search => async (req, res) => {
  const login = User.getLoggedUser(req);
  const profile = await Getter.getUser({ field: 'login', value: login });
  const { blockedBy, blockes, likedBy, newLikedBy, visitedBy, newVisitedBy, matches } = profile;
  const blockedFilter = blockedBy.concat(blockes);
  let profilesFilter;
  let newProfilesFilter;
  if (search === 'like') {
    profilesFilter = await getVisitsOrLikesProfiles(likedBy, blockedFilter);
    newProfilesFilter = await getVisitsOrLikesProfiles(newLikedBy, blockedFilter);
    Updater.clearNewLikes({ login });
  } else if (search === 'visit') {
    profilesFilter = await getVisitsOrLikesProfiles(visitedBy, []);
    newProfilesFilter = await getVisitsOrLikesProfiles(newVisitedBy, blockedFilter);
    Updater.clearNewVisits({ login });
  } else {
    profilesFilter = await getMatchesProfiles(matches, blockedFilter);
  }
  return res.send({
    success: true,
    profile,
    profiles: profilesFilter,
    newProfiles: newProfilesFilter,
    error: '',
  });
};

const closeProfile = async (req, res) => {
  const login = User.getLoggedUser(req);
  UserUpdater.closeProfile({ login });
  return res.send({
    success: true,
    error: '',
  });
};

export {
  getMyProfile,
  getProfile,
  getVisitsOrLikesOrMatches,
  closeProfile,
};
