# StripeMetrics (Frontend)

![Node.js](https://img.shields.io/badge/node.js-20.12.2-blue)
![npm](https://img.shields.io/badge/npm-10.6.0-blue)
![Tailwind CSS](https://img.shields.io/badge/tailwind_css-3.4.3-blue)

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

### Backend

[Backend Repository](https://github.com/peppapig13132/StripeMetrics-Backend)

### Steps

1. Clone the repository from GitHub
    
    ```
    git clone https://github.com/peppapig13132/StripeMetrics-Frontend.git
    cd StripeMetrics-Frontend
    ```

2. Install Dependencies
    
    Install the necessary dependencies for the Frontend - React project. 
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
