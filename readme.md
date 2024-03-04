# Budgeting App Backend

This is the backend application for the Budgeting App. It provides API endpoints to manage transactions.

## Getting Started

To get started with the backend application, follow these steps:

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the server:

   ```
   nodemon server.js
   ```

## API Endpoints

### Base URL

The base URL for accessing the API endpoints is `http://localhost:4321`.

### Transactions

#### GET /transactions

- Description: Retrieve all transactions.
- Response: JSON array containing all transactions.
- Example:

  ```json
  [
    {
      "id": 1,
      "item_name": "Freelance Work",
      "amount": 600,
      "date": "2024-02-26",
      "from": "Client",
      "category": "Income"
    }
    // Other transactions...
  ]
  ```

#### GET /transactions/:id

- Description: Retrieve a single transaction by ID.
- Parameters:
  - `id`: Transaction ID.
- Response: JSON object representing the transaction.
- Example:

  ```json
  {
    "id": 1,
    "item_name": "Freelance Work",
    "amount": 600,
    "date": "2024-02-26",
    "from": "Client",
    "category": "Income"
  }
  ```

#### POST /transactions

- Description: Create a new transaction.
- Request Body: JSON object representing the new transaction.
- Example:

  ```json
  {
    "item_name": "Groceries",
    "amount": -50,
    "date": "2024-03-01",
    "from": "Supermarket",
    "category": "Groceries"
  }
  ```

#### PUT /transactions/:id

- Description: Update an existing transaction by ID.
- Parameters:
  - `id`: Transaction ID.
- Request Body: JSON object representing the updated transaction.
- Example:

  ```json
  {
    "item_name": "New Item Name",
    "amount": 100,
    "date": "2024-03-01",
    "from": "New Source",
    "category": "New Category"
  }
  ```

#### DELETE /transactions/:id

- Description: Delete a transaction by ID.
- Parameters:
  - `id`: Transaction ID.

## Models

The `account.model.js` file contains mock data for transactions. Each transaction object has the following properties:

- `id`: Transaction ID.
- `item_name`: Name of the item.
- `amount`: Amount of the transaction.
- `date`: Date of the transaction.
- `from`: Source of the transaction.
- `category`: Category of the transaction.
