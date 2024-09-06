import { Link } from 'react-router-dom';
import './logo.module.scss';

function Logo() {
  return (
    <Link to="/">
      <img src="https://staygoldcrypto.com/tokens/TREAL/treal-020.jpeg" width="10%" alt="TREAL Logo Image - Tokenization of Loans for Real Estate Property Owners and Investors - Token Landing Page Project by StayGoldCrypto.com" />
    </Link>
  );
}

export { Logo };
