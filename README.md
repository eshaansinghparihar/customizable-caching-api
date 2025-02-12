# customizable-caching-api

![Test Coverage](https://img.shields.io/badge/coverage-98.21%25-brightgreen)
![TypeScript](https://img.shields.io/badge/code%20written%20in-Typescript-blue)
![Jest](https://img.shields.io/badge/testing%20library-Jest-yellow)
![Node.js](https://img.shields.io/badge/node%20version-v20.18.0-orange)

# Overview
A simple and efficient in-memory caching API built with Node.js and TypeScript. This API provides basic caching functionality with a configurable maximum size limit.

# Features

1. In-memory key-value pair storage
2. Configurable maximum cache size
3. RESTful API endpoints for cache operations
4. TypeScript implementation for type safety
5. Error handling middleware
6. Input validation

# Tech Stack

- Node.js
- TypeScript
- Express.js

# API Endpoints 

## 1. POST /cache

Stores a key-value pair in the cache.

### Request Body
```json
{
    "key": "string",
    "value": "any"
}
```

### Response 201
```json
{
    "key": "string",
    "value": "any",
    "timestamp": 1707547200000,
    "message": "Set Cache Successfully"
}
```

## 2. GET /cache/{key}

Retrieves a value from the cache by key.

### Response 200
```json
{
    "key": "string",
    "value": "any",
    "timestamp": 1707547200000,
    "message": "Get Cache Successfully"
}
```

## 3. DELETE /cache/{key}

Removes a key-value pair from the cache.

### Response 204

# Installation and Setup

## Prerequisites

1. Ensure that **Node.js** and **NPM** are installed on your system.
   - You can download Node.js from [here](https://nodejs.org/).

## Steps to Set Up

1. Clone the repository:

   ```bash
   git clone https://github.com/eshaansinghparihar/customizable-caching-api.git

2. Install the dependencies:

    ```bash
    npm install

3. Start the server:

    ```bash
    npm run start

    The server will start running at http://localhost:8000.

4. Run Unit Tests:

    ```bash
    npm run test

## Test Coverage

[View Test Coverage Report](https://eshaansinghparihar.github.io/customizable-caching-api/)

## Deployment

This project has been deployed on https://customizable-caching-api-ncv1.onrender.com.

## Endpoints Reference

A Postman Collection is included in the repository for easy access to the endpoints and testing the API manually. You can import the collection in your Postman app to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
