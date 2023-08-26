# Earth-Mars Communication API

The Earth-Mars Communication API is a Node.js Express application that facilitates communication between Earth and Mars by encoding and decoding messages using the Nokia keypad pattern. It includes a custom middleware to check sender and receiver headers in the API requests.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Example](#example)
- [Dependencies](#dependencies)
- [License](#license)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/earth-mars-communication.git
   cd earth-mars-communication

   
2. Install the dependencies using npm:

   ```bash
   npm install
  
3. Start the server:
 
   ```bash
   node index.js


4. Request:
   send a post request to endpoint
   ```bash
   /api/earth-mars-comm/message
  
6. Endpoints

   GET /

   Returns a simple "Hello World!" message.
   POST /api/earth-mars-comm/message

   Encodes or decodes a message based on sender and receiver headers.
  Headers:
  x-sender: "earth" or "mars"
  x-receiver: "earth" or "mars"

  ```bash
 {
  "message": "hi this is venkat"
 }

Output
 {
  msg: { Response: ' from earth', msg: 'hi this is venkat' },
  translated: '44.444 8.44.444.7777 444.7777 888.33.66.55.2.8'
 }


