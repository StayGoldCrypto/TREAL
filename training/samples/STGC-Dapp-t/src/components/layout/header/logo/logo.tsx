import { Link } from 'react-router-dom';
import './logo.module.scss';

function Logo() {
  return (
    <Link to="/">
      <h1>LOGO</h1>
      <img src="https://staygoldcrypto.com/tokens/TREAL/treal-020.jpeg" width="20%" alt="TREAL Logo Image - Tokenization of Loans for Real Estate Property Owners and Investors - Token Landing Page Project by StayGoldCrypto.com" />
    </Link>
  );
}

export { Logo };
