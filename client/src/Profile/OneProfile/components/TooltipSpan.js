import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';

const TooltipSpan = (props) => {
  const { tooltip, className } = props;

  return (
    <OverlayTrigger placement="bottom" overlay={tooltip}>
      <span className={className} />
    </OverlayTrigger>
  );
};

export default TooltipSpan;
