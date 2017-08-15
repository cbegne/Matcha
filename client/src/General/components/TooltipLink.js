import { Link } from 'react-router-dom';
import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';

const TooltipSpan = (props) => {
  const { to, tooltip, className } = props;

  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <Link to={to} className={className} />
    </OverlayTrigger>
  );
};

export default TooltipSpan;
