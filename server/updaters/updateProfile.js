import moment from 'moment';
import Mongo from '../config/MongoConnection.js';

const updateInfos = ({ login, req }) => {
  const { email, firstName, lastName, orientation, gender, birthDate } = req.body;
  const date = moment(birthDate, "DD/MM/YYYY", true).format();

  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { email, firstName, lastName, orientation, gender, birthDate: date }
    },
  );
}

const updateBio = ({ login, req }) => {
  const { bio } = req.body;

  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { bio }
    },
  );
}

const updateTags = ({ login, req }) => {
  const { tags, tag } = req.body;

  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { tags }
    },
  );

  if (tag && tag !== undefined) {
    Mongo.db.collection('suggestions').update(
      { text: tag },
      {
        $setOnInsert: { text: tag }
      },
      { upsert: true }
    );
  }
}

const updateProfilePic = ({ login, req }) => {
  const profilePic = req.file.filename;

  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { profilePic }
    },
  );
}

const updatePics = ({ login, picsFilename }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $push: { pictures: { $each: picsFilename } }
    }
  );
}

const removePic = ({ login, filename }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $pull: { pictures: filename }
    }
  );
}

const changePassword = ({ login, passwordHash }) => {
  Mongo.db.collection('users').updateOne(
    { login },
    {
      $set: { password: passwordHash }
    }
  );
}
export {
  updateInfos,
  updateBio,
  updateTags,
  updateProfilePic,
  updatePics,
  removePic,
  changePassword,
}
