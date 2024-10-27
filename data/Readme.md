# CSV to JSON Conversion

## Overview

This project is an Expo application that displays a list of products and their stock availability based on user input for pincodes. The product and stock data are sourced from a JSON file that was initially in CSV format.

This README provides instructions on setting up your project to use CSV data directly converted to JSON without parsing it dynamically in code. The CSV file will be manually converted to JSON and then loaded into your app.


## Steps

### 1. Convert CSV to JSON

First, manually convert your CSV file into a JSON format. You can use an online tool like [CSV to JSON converter](#) or any code-based approach if needed. 

Suppose your CSV structure is:

```csv
product_id,product_name,pincode,stock
1,Product A,123456,10
2,Product B,654321,5


### Data Format

The `products.json` file contains an array of product objects with the following structure:

```json
[
  {
    "product_id": 1,
    "product_name": "Product A",
    "pincode": 123456,
    "stock": 10
  },
  {
    "product_id": 2,
    "product_name": "Product B",
    "pincode": 654321,
    "stock": 5
  }
]
