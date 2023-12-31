﻿# DigitalCertificateSystemBackend

## Abstract 

The DigitalCertificateSystemBackend repository presents a comprehensive Blockchain-Based Certificate Management System designed to meet the evolving demands of various stakeholders such as government offices, students, industries, and educational institutes. At its core is the DigiCert.sol smart contract, deployed on the Ethereum blockchain, utilizing the ERC-721 standard for non-fungible tokens (NFTs) to represent digital certificates. The deployment script, deploy.js, streamlines the process of deploying the DigiCert.sol contract, providing a reference address for subsequent interactions. The Lock.js is a script is a comprehensive set of tests for a smart contract named "Lock" thoroughly tested using the tester.js script, ensuring the proper deployment and functionality of features like unlock time setting, ownership, fund transfer, and withdrawal. Additionally, the crypto-helper.js module offers utility functions for cryptographic operations, including key pair generation and encryption/decryption. Facilitating interactions with the smart contract, the blockchain-helper.js module handles tasks such as adding minters and retrieving NFTs. This repository employs the InterPlanetary File System (IPFS) and ipfs-helper.js module manages interactions with the InterPlanetary File System (IPFS) for secure storage and retrieval of data. Validation functions in validator.js ensure the integrity of various data inputs, including email addresses, public addresses, Aadhar cards, and private keys. This module also includes middleware for verifying JWT tokens and user credentials. The helpers.js file consolidates various functions related to certificate data, covering tasks like retrieving certificate data and moving files. The tester.js script verifies the functionality of certificate data retrieval and file movement. In summary, the DigitalCertificateSystemBackend repository addresses the critical need for a secure and transparent certificate management system, leveraging blockchain and IPFS integration. Its multi-faceted approach benefits government entities, students, industries, and educational institutes by ensuring reliable certificate issuance and validation, streamlining hiring processes, and enhancing certification credibility. Beyond immediate challenges, the project lays the groundwork for a trust-based ecosystem, contributing to the evolution of secure digital identity solutions.


## Technology Stack

1) NodeJS
  
2) MongoDB

3) IPFS (InterPlanetary File System)

