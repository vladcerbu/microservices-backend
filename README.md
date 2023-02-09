***

System Oriented Architecture  
**Babes-Bolyai University**  
Cerbu-Sfarghiu Vlad

***

# Purpose

This is an experiment in which I built a functional e-commerce type application (an online book shop) using micro services.

## Installation

From the root folder, run the following commands:

    cd host        --> npm install   --> cd ..
    cd order-ms    --> npm install   --> cd ..
    cd products-ms --> npm install   --> cd ..
    cd host        --> npm run build --> npm run start --> cd ..
    cd order-ms    --> npm run build --> npm run start --> cd ..
    cd products-ms --> npm run build --> npm run start --> cd ..


Now, everything should be set up for the server. You can check out the frontend part of the application [here]().
You can also use docker images using the command `docker-compose up` from the root folder if you have docker installed.
Bear in mind that the ".env" files are not available due to security reasons.

### Description

The backend part of the application consists of 3 microservices, one of which is the host that contains all the REST endpoints callable by the frontend part. The host microservice then calls the other APIs when requested.
The Products Microservice provides endpoints regarding all the products and also for adding products in the cart. It reads the products from the DB imitation (using node-persist) and writes to the DB the products that are added to the cart.
The Order Microservice provides the endpoint for executing the Order once the ordering form is submitted. It reads the cart from the DB and it uses Gmail API to send an email to the address provided in the form by the user. This is being done through some OAuth2 tokens provided by Google Cloud Platform (GCP).