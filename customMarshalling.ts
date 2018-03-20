import * as log from 'winston';

function displayRecords(arrayOfObjects) {
    if (arrayOfObjects && arrayOfObjects.length > 0) {
        log.info('Length of the Object Displayed ' + arrayOfObjects.length);
        arrayOfObjects.forEach(function (record) {
            log.info(JSON.stringify(record));
        });
    } else {
        log.info('[]');
    }
    log.info('==============================')
};

function customMarshallingForTheMemberRecords(memberRecords) {
    let unMarshalledRecords = [];
    if (!memberRecords || (memberRecords && memberRecords.length === 0)) {
        return null;
    } else {
        for(let marshalCount=0; marshalCount < memberRecords.length; marshalCount++) {
            if (memberRecords[marshalCount].Items && memberRecords[marshalCount].Items[0]) {
                log.info(JSON.parse(JSON.stringify(memberRecords[marshalCount].Items[0])));
                unMarshalledRecords.push(JSON.parse(JSON.stringify(memberRecords[marshalCount].Items[0])));
            } else {
                continue;
            }
        }
    }
    return unMarshalledRecords;
}

let emptyMemberRecords = [
    {
        "Items": [],
        "Count": 0,
        "ScannedCount": 0
    }
];

let memberRecords = [
    {
        "Items": [
            {
                "tenants": {
                    "f9dd1f58-d8e8-0540-cefc-b7d72081a941": {
                        "memberStatus": "ENABLED",
                        "isAdmin": true
                    }
                },
                "authPoolId": "us-west-2_frN7zLijy",
                "authClientId": "41379741pvvlc0to9s7i2irtjp",
                "email": "abhi.aec89@gmail.com",
                "id": "3f2fb5f4-e3eb-072a-a167-f5982f4a3ab0",
                "isMigrated": true
            }
        ],
        "Count": 1,
        "ScannedCount": 1
    }
    ,
    {
        "Items": [
            {
                "tenants": {
                    "a24dfeee-3fa5-6def-db85-68e0435baacb": {
                        "memberStatus": "ENABLED",
                        "isAdmin": true
                    }
                },
                "authPoolId": "us-west-2_ZnRAi0Wke",
                "authClientId": "v43663noto2o8al5j072f1s9p",
                "email": "abhi.aec89@live.com",
                "id": "02fe50be-a698-d160-dfcf-07461448ea2a",
                "isMigrated": true
            }
        ],
        "Count": 1,
        "ScannedCount": 1
    }
];


log.info(`Member Records Before Custom Marshalling :`);

displayRecords(emptyMemberRecords);

let updatedMemberRecords = customMarshallingForTheMemberRecords(emptyMemberRecords);

log.info(`Member Records after Custom Marshalling :`);

displayRecords(updatedMemberRecords);