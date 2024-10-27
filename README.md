# Delivery Date Estimation App

## Overview
This React Native application allows users to view a catalog of 5,000 products, input their delivery pincode, and get an estimated delivery date based on the logistics provider associated with the region. The app supports three providers: Provider A, Provider B, and General Partners, each with unique delivery timeframes and cutoff times. 


## Features
- **Product Selection**: Users can view and select products from a list.
- **Pincode Input**: Users enter a pincode to check the delivery eligibility.
- **Delivery Date Estimation**: Estimates delivery time based on logistics provider rules:
  - **Provider A**: Same-day delivery if ordered before 5 PM and the product is in stock.
  - **Provider B**: Same-day delivery if ordered before 9 AM; otherwise, next-day delivery.
  - **General Partners**: Delivery within 2-5 days based on the region.
- **Countdown Timer**: A timer shows the time remaining to qualify for same-day delivery for Provider A and B.
- **Responsive UI**: Optimized for mobile and responsive across devices.

## Setup and Installation

### Prerequisites

- **Node.js** (v14 or above)
- **React Native Expo** (for Android or iOS or Web setup)

## Installation

1. Clone the repository:
   ```bash
   git clone <https://github.com/khaja-moiz/deliveryestimatorapp.git

2. Navigate to the project directory:
   ```bash
   cd deliveryestimatorapp

3. Install dependencies:
   ```bash
     npm install

4. Run the app:
    ```bash
      npm start

## Set Up a Mobile Device with Expo Go
1. Download the Expo Go app from the Google Play Store, or visit the Expo Go page on the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=docs).
2. After starting the app, scan the QR code displayed in your terminal or browser using Expo Go (Android) or the Camera app (iOS).
3. Alternatively, you can access the app directly by entering the following URL in your mobile browser: [http://localhost:8081](http://localhost:8081).


## Project Structure
- **components/**: Contains modular UI components (e.g., ProductItems, ProductModel).
- **utils/**: Utility functions for date handling, pincode validation, and provider logic.
- **App.js**: Entry point of the app, handles navigation and state management.

## Configuration
-  **Product and Pincode Data**: Dummy data for products and pincodes is available for simulation. Update data in /data/products.json and /data/pincodes.json for more realistic testing.
-  **Provider Rules**: Modify the logistics provider rules in /utils.jsx as needed.

## Deployment
This app is hosted on [Vercel/Netlify](https://vercel.app).

## Steps for Deployment
- Push your project to a GitHub repository.
- Connect the repository to Vercel/Netlify and configure environment variables if needed.
- Trigger the build and deploy.

## Usage
- **Select a Product**: Browse or search through the list of products and select one.
- **Enter Pincode**: Input a valid pincode associated with one of the logistics providers.
- **View Estimated Delivery Date**: Based on the provider and cutoff times, the estimated delivery date appears.
- **Countdown Timer**: If eligible for same-day delivery, a countdown timer will display how much time remains.

## Documentation

[Documentation](https://d8it4huxumps7.cloudfront.net/uploads/submissions_case/67165cb4e0f7e_Clinikally_Coding_Case.pdf)
## License

This project is licensed under the MIT License - see the [MIT](https://choosealicense.com/licenses/mit/) file for details.


### Instructions for Use:
1. Replace `yourusername` in the Git clone URL with your actual GitHub username.
2. Insert your hosting link where indicated.
3. Modify any sections to better fit your project's specifics or add additional information if necessary.


## Authors

- [MOHD MOIZ UDDIN](https://github.com/khaja-moiz)