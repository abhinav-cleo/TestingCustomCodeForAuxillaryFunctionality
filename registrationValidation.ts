import * as log from 'winston';
let userRecords = {
    "Items": [
        {
            "tenants": {
                "85b82cba-c3b1-eeae-f14d-eea67fe21291": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_49OyDeaqN",
            "authClientId": "1uc0o9logatfirqn5b0131dvqe",
            "email": "pdubey@cleo.com",
            "id": "a4c48c9c-10d8-2f8d-0292-7f830ddf17bf",
            "isMigrated": true
        }
    ],
    "Count": 1,
    "ScannedCount": 1
};

let tenantIdOfWhichTheUserIsGoingToBePartOf = '85b82cba-c3b1-eeae-f14d-eea67fe21291';

function checkIfUserIsAllowedToRegister(userRecords, tenantId) {

    if (!tenantId || !userRecords || !userRecords.Items || !userRecords.Items[0] || !userRecords.Items[0].tenants) {
        return false;
    } else {
        if (userRecords.Items[0].tenants[tenantId].memberStatus === 'ENABLED') {
            return true;
        } else {
            return false;
        }
    }
}

let result  = checkIfUserIsAllowedToRegister(userRecords,tenantIdOfWhichTheUserIsGoingToBePartOf);

log.info(`is user allowed to register ? ${result}`);