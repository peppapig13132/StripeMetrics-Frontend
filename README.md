# STRIPE DASHBOARD (Frontend)

## Features

- [x] MRR
- [x] Subscribers
- [x] MRR Movements
- [x] Average Staying
- [x] Customer Lifetime Value
- [x] Customer Churn Rate
- [x] Free to paid subscriptions
- [x] Free trials
- [x] Annual Run Rate


## Deployment

### Prerequisites

- Node.js v20.12.2 LTS
- npm v10.6.0
- Git
- [Backend](https://github.com/peppapig13132/Stripe-Dashboard-Backend) already set up

### Steps

1. Clone the repository from GitHub
    
    ```
    git clone https://github.com/peppapig13132/Stripe-Dashboard-Frontend.git
    cd Stripe-Dashboard-Frontend
    ```

2. Install Dependencies
    
    Install the necessary dependencies for both the React 
    ```
    npm install
    ```

3. Set Backend API URL in `.env`

    Replace filename `.env.example` to `.env`.
    ```
    # If you have a domain for this project ...
    REACT_APP_API_URL=https://your-domain.com/api

    # If the backend is running on your local PC with port 8000 ...
    REACT_APP_API_URL=http://localhost:8000/api
    ```

4. Build the Code

    Build the React application for production. This will create a `build` directory with the compiled files.
    ```
    npm run build
    ```

5. Move the Code to `BACKEND_DIR/static/`
    Move the contents of the `build` directory to the `static` directory of the Express.js backend. This can be done manually or using a script.
    ```
    cp -r build/* /path/to/BACKEND_DIR/static/
    ```
