# TREAL - TEST Token Real State

## Tokenomics Strategy

### Total Supply
- **Initial Supply:** 1 billion TREAL tokens.

### Distribution
- **Public Sale (ICO/IDO):** 30% (300 million TREAL)
- **Team & Founders:** 15% (150 million TREAL) with a vesting period of 4 years, 1-year cliff.
- **Advisors & Partnerships:** 10% (100 million TREAL) with a vesting period of 2 years.
- **Community & Ecosystem Fund:** 20% (200 million TREAL) for staking rewards, airdrops, and grants.
- **Liquidity Provision:** 10% (100 million TREAL) for DEX and CEX listings.
- **Reserve Fund:** 10% (100 million TREAL) for unforeseen expenses or future strategic developments.
- **Marketing & Promotion:** 5% (50 million TREAL).

### Token Utility
- **Collateral for Loans:** TREAL tokens can be staked as collateral to secure property-backed loans.
- **Interest Payments:** Lenders receive interest payments in TREAL tokens, incentivizing lending activity.
- **Property Tokenization:** Real estate properties can be tokenized into TREAL tokens, fractionalizing ownership.
- **Transaction Fees:** All transactions within the ecosystem (e.g., property transfers, loans) are paid in TREAL tokens.
- **Governance:** TREAL holders can participate in voting on protocol upgrades, property listings, and loan terms.

### Vesting Schedule
- **Team & Founders:** 25% released after 1 year, with the remaining 75% released linearly over the next 3 years.
- **Advisors & Partnerships:** Linear vesting over 2 years, ensuring long-term alignment with the project.

### Staking Rewards
- **Yield Farming:** TREAL holders can stake their tokens to earn additional TREAL or other partnered tokens.
- **Property Ownership Yield:** Token holders who own fractionalized property tokens can earn rental income in TREAL.

## Marketing Plan

### Target Audience
- **Real Estate Investors:** Focus on traditional real estate investors looking for innovative financing and fractional ownership.
- **Cryptocurrency Enthusiasts:** Appeal to the crypto community with the promise of a secure, blockchain-based real estate market.
- **DeFi Users:** Target users interested in decentralized finance, offering them real estate-backed financial products.
- **Institutional Investors:** Engage with institutional investors exploring asset-backed tokens and blockchain technology.

### Key Marketing Channels
- **Social Media Campaigns:** Utilize Twitter, LinkedIn, and Medium to share updates, educate the community, and engage with potential investors.
- **Influencer Partnerships:** Collaborate with crypto and real estate influencers to expand reach and credibility.
- **Content Marketing:** Regularly publish blogs, whitepapers, and case studies to educate the market on the benefits of TREAL and the underlying technology.
- **Community Engagement:** Develop an active Telegram, Discord, and Reddit community, offering regular AMAs and community rewards.
- **Press Releases:** Distribute press releases to major crypto and real estate news outlets, announcing key milestones, partnerships, and product launches.

### Strategic Partnerships
- **Real Estate Firms:** Partner with real estate firms in key markets (Argentina, Mexico, Brazil, USA) to tokenize properties on the TREAL platform.
- **DeFi Protocols:** Collaborate with DeFi platforms for liquidity provision and lending opportunities.
- **Blockchain Platforms:** Work closely with Polkadot parachains and the Vara Network to integrate and promote TREAL within their ecosystems.

### Launch Strategy
- **Initial Coin Offering (ICO/IDO):** Conduct a public sale on a leading platform, with a robust KYC/AML process to ensure regulatory compliance.
- **Airdrops:** Distribute tokens to early adopters and strategic partners to encourage initial use and liquidity.
- **Exchange Listings:** Secure listings on major exchanges, focusing first on decentralized exchanges (DEXs) and later on centralized exchanges (CEXs).
- **Real Estate Tokenization Pilot:** Launch a pilot program with a limited number of properties, showcasing the functionality of the TREAL token.

---

**TREAL - Token Real State** aims to revolutionize the real estate market by leveraging blockchain technology to enable fractional ownership, secure lending, and transparent transactions.

---

**TREAL - Token Real State for Training** aims to revolutionize the real estate market by leveraging blockchain technology to enable fractional ownership, secure lending, and transparent transactions.

# TREAL - TEST Token Real Estate

## Project Structure

This project is organized into different directories to efficiently manage the smart contract, backend, and frontend. Below is a description of the project's structure:

### Directory Description

- **training/TREAL-token-real-state/**: Contains source code for the smart contract written in Rust.
  - **TREAL_token_vara/**: Specific project for the TREAL token, including the contract logic and tests.
  
- **backend/**: Rust project serving as the backend for the application. (To be initiated)
  - **src/**: Source code for the backend.
    - **routes/**: Directory containing API routes such as `/balance` and `/tokens`.
    - **models/**: Contains models used by the backend.
    - **config.rs**: Configuration file for the backend.

- **frontend/**: React/TypeScript project that makes up the user interface. (To be initiated)
  - **public/**: Contains static files like `index.html`.
  - **src/components/**: React components like `AccountBalance`, `PropertyList`, and `InvestmentDashboard`.
  - **assets/**: Static files such as images and CSS styles.
  - **api.ts**: Contains API utility functions.
  - **tsconfig.json**: TypeScript configuration file.
  - **vite.config.ts**: Configuration file for Vite.

This directory structure helps you understand where the different components of your application are located and how they interact with each other.

### Gitpod
<a href="https://gitpod.io/#https://github.com/StayGoldCrypto/TREAL/training/samples/TREAL-token-real-state" target="_blank">Open in Gitpod</a>

### Projected Path Files

```rust
/*
TREAL-token-real-estate/
├── TREAL_token_vara/
│ ├── app/*
│ ├── wasm/*
│ └── Cargo.toml
├── TREAL_token_discontinued/*
│── rust-toolchain.toml
├── Cargo.toml
│── README.md
├── backend/
│ ├── Cargo.toml
│ ├── src/
│ │ ├── main.rs
│ │ ├── routes/
│ │ │ ├── mod.rs
│ │ │ ├── balance.rs
│ │ │ ├── tokens.rs
│ │ │ └── loans.rs
│ │ ├── models/
│ │ │ ├── mod.rs
│ │ │ ├── account.rs
│ │ │ ├── token.rs
│ │ │ └── loan.rs
│ │ └── config.rs
│ └── README.md
├── frontend/
│ ├── package.json
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ ├── App.tsx
│ │ │ ├── Tabs.tsx
│ │ │ ├── AccountBalance.tsx
│ │ │ ├── PropertyList.tsx
│ │ │ ├── InvestmentDashboard.tsx
│ │ │ ├── Modal.tsx
│ │ │ ├── Wallet.tsx
│ │ │ └── WalletModal.tsx
│ │ ├── styles/
│ │ │ └── global.css
│ │ ├── App.tsx
│ │ ├── index.tsx
│ │ └── api.ts
│ ├── tsconfig.json
│ ├── vite.config.ts
│ └── README.md
└── LICENSE
*/
```
---

# DAYLY TO DO
