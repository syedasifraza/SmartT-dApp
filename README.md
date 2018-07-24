<p align="center">
  <img src="./smartT.png" /> 
</p>

<h1 align="center">SmartT</h1>

<p align="center">
  This is a chat <strong>dApp</strong> on the <strong>nOS</strong> platform
</p>

## Purpose
The goal of this project is to provide a chat dApp running on nOs for encrypted messaging on the NEO blockchain. This is a MVP and WIP, for example encyption is not yet implemented. 


## Setup
```bash
$ git clone https://github.com/kokahunter/neochat-local.git
$ neochat-local
$ yarn
$ yarn start
```

Smart contract
```
build /smart-contracts/neochat.py
import contract /smart-contracts/neochat.avm 0710 05 True False
```

## Testing
Use `yarn test:local` or `npm run test:local` to run all tests locally. The `test` command is reserved for CI builds.

## Document structure
```
react-stack-boilerplate
├── src
│   ├── __helpers__
│   ├── __mocks__
│   ├── assets
│   ├── components
│   │   └── __tests__
│   │       └── __snapshots__
│   ├── nos
│   └── views
│       └── __tests__
│           └── __snapshots__
├── .babelrc
├── .eslintrc
├── .gitignore
├── CHANGELOG.md
├── jest.config.js
├── jest.setup.js
├── package.json
├── README.md
└── yarn.lock
```

## Known issues
