import rp = require("request-promise");

let url = 'https://ibwhjdxc9c.execute-api.us-west-2.amazonaws.com/ANG/api/getMember?emailId=agupta@cleo.com';
let token = 'Bearer eyJraWQiOiJnUjlaaE84aFZPSnV6cWtudGx1NGRxbWVqdFFlVFVJSHVYZUtmemtzaCtRPSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206dGl0bGUiOiJTREUgLSBJSUkiLCJzdWIiOiJiOTk0YjFiMy0wZDQ5LTRkM2ItOWE1\n' +
    'NS0xNzJiY2E5ZmYzMjkiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtd2VzdC0yLmFtYXpvbmF3cy5jb21cL3VzLXdlc3QtMl9XT2t6c0lMdloiLCJjb2duaXRvOnVzZXJuYW1lIjoiN2UxYmNmN2UtMWNjZi1mMDI0LTM1NzYtNTc3MzY4ZmI0OWQ1IiwicHJl\n' +
    'ZmVycmVkX3VzZXJuYW1lIjoiYWd1cHRhQGNsZW8uY29tIiwiZ2l2ZW5fbmFtZSI6IkFiaGluYXYiLCJjdXN0b206Y29tcGFueSI6IkNsZW8iLCJhdWQiOiI1ZzNsamx0bnM3ZXZycm5xNWwxcDRwM2JyMyIsImV2ZW50X2lkIjoiY2VmOGI3NjUtMzdkOC0xMWU4LWIyYzAt\n' +
    'N2IzZWZkODMwMTNhIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1MjI4MjY0OTYsImV4cCI6MTUyMjgzMDA5NiwiaWF0IjoxNTIyODI2NDk2LCJmYW1pbHlfbmFtZSI6Ikd1cHRhIiwiZW1haWwiOiJhZ3VwdGFAY2xlby5jb20ifQ.G2mBxU2z_rVec1kLOx4C6\n' +
    'lrJ6ywRGx57RIh_y1qsyu6Wl9xbXWjb9VLCpQ7GGK4-648Hz4Zdb-EVqHhuaYRprh9RVF9Errkyr9SC7znCu0sT9UjaefqPpSuiJYcvpZqThwxjEBRCnP7KR9Hgtf6Ci0fBBrY2rOEVvXdZdoPlhHA6P3j-3jM4b4pRw1J72RFkJVuhKJWXZGUMKNZiVOs1OA4D_Up7Ea65R\n' +
    'B4hVqLIMN8rzzHH6y29rvC4gYJkXcEmEDnqA0gfB3hityhiDbm1KIq-yDY5rM9g6OieNezy0eXC0xsjkTWI6xDxl0LC9Sqrel1NJ27dPJ1mc0pG28_1DQ';

const optionsget = {
    uri: url,
    headers: [
        {
            name: 'Authorization',
            value: token
        }
    ],
    json: false
};

function getTenantId() {
    return new Promise((resolve, reject) => {
        rp(optionsget)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

function nestedGetTenant() {
    return new Promise((resolve, reject) => {
        getTenantId().then((data) => {
            console.log(`resolved data :: ${JSON.stringify(data)}`);
            resolve(data);
        })
            .catch((error) => {
                console.error(`rejected error ::: ${JSON.stringify(error)}`);
                reject(error);
            });
    });
}

nestedGetTenant().then((data) => {
    console.log(`nested resolved data :: ${JSON.stringify(data)}`);
})
    .catch((error) => {
        console.error(`nested rejected error ::: ${JSON.stringify(error)}`);
    });