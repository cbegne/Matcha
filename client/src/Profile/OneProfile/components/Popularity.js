import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Popularity = (props) => {
  const { popularity } = props.profile;

  const tooltip = (
    <Tooltip id="popularity">Score de popularité du profil : {popularity}</Tooltip>
  );

  let trophy;
  if (popularity < 50) {
    trophy = <span className="fa fa-trophy bronze" />;
  } else if (popularity >= 50 && popularity < 100) {
    trophy = <span className="fa fa-trophy silver" />;
  } else if (popularity >= 100 && popularity < 500) {
    trophy = <span className="fa fa-trophy gold" />;
  } else if (popularity >= 500) {
    trophy = <span className="fa fa-trophy diamond" />;
  }

  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      {trophy}
    </OverlayTrigger>
  );
};

export default Popularity;
