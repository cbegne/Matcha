import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class Report extends Component {

  handleClick = () => {
    this.props.onClick();
  }

  render() {
    const { isReported } = this.props;
    const tooltipToReport = (
      <Tooltip id="report-as-fake">Profil faux ou inapproprié ? Attention, vous ne pourrez pas
        annuler cette action. Vous pouvez simplement bloquer
        un utilisateur que vous ne souhaitez plus voir.</Tooltip>
    );
    const tooltipReported = (
      <Tooltip id="reported-as-fake">Merci pour votre retour. Nous allons étudier ce profil.</Tooltip>
    );

    switch (isReported) {
      case true:
        return (
          <OverlayTrigger placement="bottom" overlay={tooltipReported}>
            <button
              className="fa fa-exclamation-circle reported"
              disabled
            />
          </OverlayTrigger>
        );
      default:
        return (
          <OverlayTrigger placement="bottom" overlay={tooltipToReport}>
            <button
              className="fa fa-exclamation-circle not-reported"
              onClick={this.handleClick}
            />
          </OverlayTrigger>
        );
    }
  }
}

export default Report;
