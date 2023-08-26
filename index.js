const express = require('express')
const app = express()
const port = 4444

// const msg = "I am venkat here ! over"
const nokiaPattren = [
    "2", "22", "222",
    "3", "33", "333",
    "4", "44", "444",
    "5", "55", "555",
    "6", "66", "666",
    "7", "77", "777", "7777",
    "8", "88", "888",
    "9", "99", "999", "9999"
];

function toNokia(string) {
    let coded = []

    for (let i = 0; i < string.length; i++) {
        let newMsg = string.toLocaleLowerCase()
        let code = (newMsg[i].codePointAt()) - 97

        // console.log((msg[i].codePointAt()) - 97);
        // console.log(`the PnokiaPattren code char ${string[i]} is ${PnokiaPattren[code]} `);

        if (nokiaPattren[code] == undefined) {
            coded.push(" ")
        }
        else {
            coded.push(nokiaPattren[code])
        }

    }

    // console.log(coded.toString());
    return coded.toString().replace(/, ,/g, ' ').replace(/,/g, '.')
}
// console.log(toNokia("hi bro venkat"));

function toStr(nokia) {
    const nokiaChars = nokia.split(' ');
    let decoded = "";

    for (const nokiaChar of nokiaChars) {
        if (nokiaChar === "") {
            decoded += " ";
        } else {
            const nokiaSubChars = nokiaChar.split('.');
            for (const subChar of nokiaSubChars) {
                for (let j = 0; j < nokiaPattren.length; j++) {
                    if (subChar === nokiaPattren[j]) {
                        decoded += String.fromCharCode(j + 97);
                        break;
                    }
                }
            }
            decoded += ' ';
        }
    }

    return decoded.trim();
}
// console.log(toStr('44.444 22.777.666 888.33.66.55.2.8'));


app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


//middleware to check the sender and reciver

app.use((req, res, next) => {
    const sender = req.headers['x-sender'];
    const receiver = req.headers['x-receiver'];

    // console.log(`Sender: ${sender}`);
    // console.log(`Receiver: ${receiver}`);

    next();
});



app.post('/api/earth-mars-comm/message', (req, res) => {
    try {
        const sender = req.headers['x-sender'];
        const receiver = req.headers['x-receiver'];

        if (sender === "earth" && receiver == "earth") {
            console.log("message not sent to mars , technical problam");
            res.send({ "error": "message not sent to mars , technical problam" })
        }
        else if(sender === "mars" && receiver == "mars"){
            console.log("message not sent to earth , technical problam");
            res.send({ "error": "message not sent to earth , technical problam" })
        }

        let msg = req.body.message

        //interceptor function
        function interceptor(send, receive) {
            const Response = ` from ${send}`;
            let reciveTemp;

            if (receive === "earth") {
                reciveTemp = `translated: ${toNokia(send)}`;
            } else {
                reciveTemp = `translated: ${toStr(send)}`;
            }

            let interceptor = {
                msg: { Response, msg },
                translated: (sender === "earth") ? toNokia(msg) : toStr(msg)
            };

            console.log(interceptor);
        }
        interceptor(sender, receiver)


        if (sender == "earth") {
            let enMsg = toNokia(msg)
            res.send({ enMsg })
        }
        else {
            let enMsg = toStr(msg)
            res.send({ msg: msg, translated: enMsg })
        }
    } catch (err) {
        console.log(err);
        console.log("connection lost");
    }

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})







