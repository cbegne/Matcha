import axios from 'axios';
import Cookies from 'universal-cookie';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

class Delete extends Component {

  state = {
    confirm: false,
    showModal: false,
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  confirm = () => {
    const url = '/api/close';
    axios.put(url)
    .then(({ data }) => {
      const { success } = data;
      if (success === true) {
        const cookies = new Cookies();
        cookies.remove('access_token', { path: '/' });
        global.socket.disconnect();
        this.setState({ showModal: false, confirm: true });
      }
    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    const { showModal, confirm } = this.state;

    if (confirm) { return <Redirect to="/close" />; }
    return (
      <div>
        <Button onClick={this.open}>
          Supprimer mon compte
        </Button>
        <Modal show={showModal} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>Supprimer mon compte</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Etes vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Annuler</Button>
            <Button bsStyle="primary" onClick={this.confirm}>Confirmer</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Delete;
