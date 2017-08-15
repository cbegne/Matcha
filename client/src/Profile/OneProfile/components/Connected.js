import React from 'react';
import moment from 'moment';
import 'moment/min/locales';

const Connected = (props) => {
  const { connected, lastConnection } = props.profile;
  const date = moment(lastConnection).locale('fr-fr').format('LL');

  switch (connected) {
    case true:
      return <div className="connected"><span className="fa fa-circle" /> En ligne</div>;
    default:
      return <div className="connected">Dernière connexion : <span>{ date }</span></div>;
  }
};

export default Connected;
