import React from 'react';
import moment from 'moment';

const Infos = (props) => {
  const { firstName, lastName, gender, orientation, birthDate } = props.profile;
  const date = moment(birthDate);
  const age = -date.diff(moment(), 'years');
  const genre = (gender === 'male') ? 'Homme' : 'Femme';
  const tab = [
    { name: 'Prénom', value: firstName },
    { name: 'Nom', value: lastName },
    { name: 'Age', value: `${age} ans` },
    { name: 'Genre', value: genre },
    { name: 'Orientation', value: orientation },
  ];
  const show = tab.map(data => (
    <div key={data.name}>
      <span className="infos-oneprofile"><b>{data.name}</b></span>
      <span>{data.value}</span>
    </div>
  ));

  return (
    <div className="each-box">
      <h2>Informations générales</h2>
      {show}
    </div>
  );
};

export default Infos;
