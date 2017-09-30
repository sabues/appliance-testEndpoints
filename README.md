# Local status emulator

Emulates [Authenticated Testing Endpoints](https://auth0.com/docs/appliance/monitoring/authenticated-endpoints) on a local box for testing

## Usage

Just run the project and query the documented endpoints\
Authentication is not required

```bash
curl -v http://localhost:9110/status/cpu
```

Endpoints

```bash

/testall

/status/cpu
/status/memory
/status/disk
/status/services
/status/network
/status/internet
/status/email
/status/db
/status/replicaset
```

Note: `/testall` [endpoint](https://auth0.com/docs/appliance/monitoring/testall) works a little different, it will return `OK` with response code 200 when it's working or a 520 with an error description when the authentication flow is failing. This tool will only return `Server Down` when it's failing.
Some endpoints do not return 429 status (similar to a warning depending on the resource), only 204 or 520

There's some basic timers that will help you for leaving the tool running and have changing status based on `setInterval()`
Feel free to modify the code for your testing purposes.

## Install

```bash
git clone https://github.com/sabues/appliance-testEndpoints.git
cd ./appliance-testEndpoints
npm install
node index.js

curl http://localhost:9110/        #should return 'appliance-testEndoints is working'
```