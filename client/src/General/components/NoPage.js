import React from 'react';
import { Link } from 'react-router-dom';

const UnavailablePage = () => (
  <div className="close-container">Cette page n{"'"}est pas disponible.</div>
);

const ClosedAccount = () => (
  <div className="close-container">
    <Link to="/"><span className="fa fa-arrow-left" /></Link>
    <div>Merci d{"'"}avoir participé à Matcha !
      Vous compte a bien été supprimé.
    </div>
  </div>
);

const InvalidToken = () => (
  <div className="close-container">
    <Link to="/"><span className="fa fa-arrow-left" /></Link>
    <div>
      Ce lien n{"'"}est pas valide, ou votre compte a déjà été confirmé.
    </div>
  </div>
);

export { UnavailablePage, ClosedAccount, InvalidToken };
