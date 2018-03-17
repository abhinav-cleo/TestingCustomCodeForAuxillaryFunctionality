function displayRecords(arrayOfObjects) {
    console.log('Length of the Object Displayed ' + arrayOfObjects.length);
    arrayOfObjects.forEach(function (record) {
        console.log(record.email);
    });
    console.log('==============================')
};

function cleanUpInviteListToRemoveTheInvitersEmail(inviteList, inviteeEmail) {

    if (inviteList.length === 0) {
        return null;
    }

    for (let count = 0; count < inviteList.length; count++) {
        if (inviteList[count].email === inviteeEmail) {
            delete inviteList[count];
            break;
        } else {
            continue;
        }
    }

    inviteList = inviteList.filter(function (el) {
        return el !== null;
    });

    return inviteList;
};

function cleanUpInviteListToRemoveMembersWhichBelongsToInvitersTenant(inviteList, currentTenantMemberEmail) {

    if (inviteList.length === 0 || currentTenantMemberEmail.length === 0) {
        return null;
    }

    if (currentTenantMemberEmail.length >= inviteList.length) {
        for (let count = 0; count < currentTenantMemberEmail.length; count++) {
            for (let ncount = 0; ncount < inviteList.length; ncount++) {
                if (inviteList[ncount].email === currentTenantMemberEmail[count]) {
                    delete inviteList[ncount];
                } else {
                    continue;
                }
            }
        }
    } else {
        for (let count = 0; count < inviteList.length; count++) {
            for (let ncount = 0; ncount < currentTenantMemberEmail.length; ncount++) {
                if (inviteList[count].email === currentTenantMemberEmail[ncount]) {
                    delete inviteList[count];
                } else {
                    continue;
                }
            }
        }
    }

    inviteList = inviteList.filter(function (el) {
        return el !== null;
    });

    return inviteList;
};

function cleanUpMemberRecordsWhichAreNotPartOfThisInviteFlow(memberRecords, inviteeEmailList) {

    if (memberRecords.length === 0 || inviteeEmailList.length === 0) {
        return null;
    }

    for (let count = 0; count < memberRecords.length; count++) {
        memberRecords[count].matchcount = 0;
        for (let ncount = 0; ncount < inviteeEmailList.length; ncount++) {
            if (inviteeEmailList[ncount].email === memberRecords[count].email) {
                memberRecords[count].matchcount = memberRecords[count].matchcount + 1;
            } else {
                continue;
            }
        }
    }

    for (let count = 0; count < memberRecords.length; count++) {
        if (memberRecords[count].matchcount === 0) {
            delete memberRecords[count];
        } else {
            continue;
        }
    }

    memberRecords = memberRecords.filter(function (el) {
        return el !== null;
    });

    return memberRecords;
};

function cleanUpMemberRecordsWhichArePartOfInvitersTenant(memberRecords, tenantId) {

    if (memberRecords.length === 0) {
        return null;
    }

    let inviterTenantMembers =[];
    for (let welcomeRecordCount = 0; welcomeRecordCount < memberRecords.length; welcomeRecordCount++) {
        let tenantIds = Object.keys(memberRecords[welcomeRecordCount].tenants);
        if (tenantIds.indexOf(tenantId) !== -1) {
            inviterTenantMembers.push(memberRecords[welcomeRecordCount].email);
            memberRecords[welcomeRecordCount] = null;
        } else {
            continue;
        }
    }

    memberRecords = memberRecords.filter(function (el) {
        return el !== null;
    });

    let result = {
        updatedMemberRecords: memberRecords,
        currentTenantMemberRecords: inviterTenantMembers
    }

    return result;
};

function isInArray(value, array) {
    let isPresent = false;

    if (array.length === 0 ) {
        return isPresent;
    }

    for (let itemCount = 0; itemCount < array.length; itemCount++) {
        if (array[itemCount].email === value) {
            isPresent = true;
            break;
        } else {
            continue;
        }
    }
    return isPresent;
}


// let emailList = [
//     {
//         "email": "preddy@cleo.com",
//         "adminStatus": false
//     },
//     {
//         "email": "pdubey@cleo.com",
//         "adminStatus": false
//     },
//     {
//         "email": "abhi.aec89@gmail.com",
//         "adminStatus": true
//     },
//     {
//         "email": "agupta@cleo.com",
//         "adminStatus": false
//     },
//     {
//         "email": "ragarwal@cleo.com",
//         "adminStatus": false
//     }
// ];

let emailList = [
    {
        "email": "agupta@cleo.com",
        "adminStatus": false
    },
    {
        "email": "preddy@cleo.com",
        "adminStatus": false
    },
    {
        "email": "abhi.aec89@gmail.com",
        "adminStatus": false
    },
    {
        "email": "gkl@cleo.com",
        "adminStatus": false
    }
]


let tenantId = 'cleo';

let inviteeEmail = 'agupta@cleo.com';

processInviteRequests(tenantId, inviteeEmail, emailList);

function processInviteRequests(tenantId, inviteeEmail, emailList) {

    let unMarshalMemberRecords = [
        {
            "tenants": {
                "cleo": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_OP0VuLD3B",
            "authClientId": "7eq110jtide58ki5qnl2egatgj",
            "id": "94c8e043-f76f-4076-72da-c6408510fcfd",
            "email": "preddy@cleo.com",
            "isMigrated": true
        },
        {
            "tenants": {
                "cleo": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_OP0VuLD3B",
            "authClientId": "7eq110jtide58ki5qnl2egatgj",
            "id": "94c8e043-f76f-4076-72da-c6408510fcfd",
            "email": "agupta@cleo.com",
            "isMigrated": true
        },
        {
            "tenants": {
                "gmail": {
                    "memberStatus": "ENABLED",
                    "isAdmin": false
                }
            },
            "authPoolId": "us-west-2_OP0VuLD3B",
            "authClientId": "7eq110jtide58ki5qnl2egatgj",
            "id": "94c8e043-f76f-4076-72da-c6408510fcfd",
            "email": "abhi.aec89@gmail.com",
            "isMigrated": true
        },
        {
            "tenants": {
                "gmail": {
                    "memberStatus": "ENABLED",
                    "isAdmin": false
                }
            },
            "authPoolId": "us-west-2_OP0VuLD3B",
            "authClientId": "7eq110jtide58ki5qnl2egatgj",
            "id": "94c8e043-f76f-4076-72da-c6408510fcfd",
            "email": "charu89@gmail.com",
            "isMigrated": true
        }
        // {
        //     "tenants": {
        //         "gmail": {
        //             "memberStatus": "ENABLED",
        //             "isAdmin": false
        //         }
        //     },
        //     "authPoolId": "us-west-2_OP0VuLD3B",
        //     "authClientId": "7eq110jtide58ki5qnl2egatgj",
        //     "id": "94c8e043-f76f-4076-72da-c6408510fcfd",
        //     "email": "abhi.aec89@gmail.com",
        //     "isMigrated": true
        // },
        // {
        //     "tenants": {
        //         "gmail": {
        //             "memberStatus": "ENABLED",
        //             "isAdmin": true
        //         }
        //     },
        //     "authPoolId": "us-west-2_OP0VuLD3B",
        //     "authClientId": "7eq110jtide58ki5qnl2egatgj",
        //     "id": "94c8e043-f76f-4076-72da-c6408510fcfd",
        //     "email": "yogeeta@gmail.com",
        //     "isMigrated": true
        // },
        // {
        //     "tenants": {
        //         "cleo": {
        //             "memberStatus": "ENABLED",
        //             "isAdmin": true
        //         }
        //     },
        //     "authPoolId": "us-west-2_OP0VuLD3B",
        //     "authClientId": "7eq110jtide58ki5qnl2egatgj",
        //     "id": "94c8e043-f76f-4076-72da-c6408510fcfd",
        //     "email": "ragarwal@cleo.com",
        //     "isMigrated": true
        // }
    ];

    let welcomeOnlyUsers = [];

    let inviteOnlyUsers = [];

// check 1 is to clean the invite list for the presence of the inviter's email

    console.log(`Person Sending the invite is ${inviteeEmail} belonging to tenant with id ${tenantId}`);

    console.log(`Invite List before cleanUp InviteList To Remove The Inviters Email :`);

    displayRecords(emailList);

    emailList = cleanUpInviteListToRemoveTheInvitersEmail(emailList, inviteeEmail);

    console.log(`Invite List after cleanUp InviteList To Remove The Inviters Email :`);

    displayRecords(emailList);

// to clean the unMarshalMemberRecords for invite Flow

    if (emailList.length > 0) {

        console.log(`Member Records before cleanUp Member Records Which Are Not Part Of This InviteFlow :`);

        displayRecords(unMarshalMemberRecords);

        unMarshalMemberRecords = cleanUpMemberRecordsWhichAreNotPartOfThisInviteFlow(unMarshalMemberRecords, emailList);

        console.log(`Member Records after cleanUp Member Records Which Are Not Part Of This InviteFlow :`);

        displayRecords(unMarshalMemberRecords);

        if (unMarshalMemberRecords.length > 0) {

            console.log(`Member Records before cleanUp Member Records Which Are Part Of Inviters Tenant :`);

            displayRecords(unMarshalMemberRecords);

            let tempRecords: any = cleanUpMemberRecordsWhichArePartOfInvitersTenant(unMarshalMemberRecords, tenantId);

            unMarshalMemberRecords = tempRecords.updatedMemberRecords;

            let currentTenantMembers = tempRecords.currentTenantMemberRecords;

            console.log(`Member Records after cleanUp Member Records Which Are Part Of Inviters Tenant :`);

            displayRecords(unMarshalMemberRecords);

            if (unMarshalMemberRecords.length > 0) {

                console.log(`Invite List before cleanUp InviteList To Remove Members Which Belongs To Inviters Tenant :`);

                displayRecords(emailList);

                emailList = cleanUpInviteListToRemoveMembersWhichBelongsToInvitersTenant(emailList, currentTenantMembers);

                console.log(`Invite List after cleanUp InviteList To Remove Members Which Belongs To Inviters Tenant :`);

                displayRecords(emailList);

                if (emailList.length > 0) {

                    for (let emailCount = 0; emailCount < emailList.length; emailCount++) {
                        if (isInArray(emailList[emailCount].email, unMarshalMemberRecords)) {
                            welcomeOnlyUsers.push(emailList[emailCount]);
                        } else {
                            inviteOnlyUsers.push(emailList[emailCount]);
                        }
                    }

                } else {
                    console.error('After cleanUp InviteList To Remove Members Which Belongs To Inviter\'s Tenant: No Invite will be send as the invite list is empty!!!!!');
                }
            } else {
                console.error('After cleanUp Member Records Which Are Part Of Inviter\'s Tenant: This log indicates that the users who are invited are already part of the inviter\'s tenant');
            }
        } else {
            console.error('After cleanUp Member Records Which Are Not Part Of This Invite Flow: this log indicates that the users who are invited are not yet known to the system hence need to be invited');
            inviteOnlyUsers = emailList;
        }
    } else {
        console.error('After cleanUp InviteList To Remove The Inviter\'s Email: No Invite will be send as the invite list is empty!!!!!');
    }

    console.log(`Users to be Invited are`);
    displayRecords(inviteOnlyUsers);
    console.log(`Users to be Welcomed are`);
    displayRecords(welcomeOnlyUsers);
}