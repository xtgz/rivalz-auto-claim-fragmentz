# Rivalz AI Bot

This repository contains a bot for interacting with the Rivalz Fragmentz claimer using Ethereum wallets.

### Prerequisites

- Node.js (version 16 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/xtgz/rivalz-auto-claim-fragmentz.git
   cd rivalz-auto-claim-fragmentz
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Setting Up Wallets

You need to provide your Ethereum private keys or mnemonics in either `privateKeys.json` in the following formats:

- For private keys (array of strings):
  ```json
  [
    "private_key_1",
    "private_key_2"
  ]
  ```

### Usage

To start the bot, run:
```bash
npm start
```

Follow the prompts to check balances or claim Fragmentz.

