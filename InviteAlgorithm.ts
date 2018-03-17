import * as log from 'winston'
function displayRecords(arrayOfObjects) {
    log.info('Length of the Object Displayed ' + arrayOfObjects.length);
    arrayOfObjects.forEach(function (record) {
        log.info(JSON.stringify(record));
    });
    log.info('==============================')
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




let emailList = [
    {
        "email": "agupta@cleo.com",
        "adminStatus": false
    }
    ,
    {
        "email": "preddy@cleo.com",
        "adminStatus": false
    }
    ,
    {
        "email": "abhi.aec89@gmail.com",
        "adminStatus": false
    }
    ,
    {
        "email": "gkl@cleo.com",
        "adminStatus": false
    }
]

let emailToUserPoolMap = [
    {
        "email": "preddy@cleo.com",
        "domain": "cleo.com",
        "adminStatus": false,
        "userPoolId": "us-west-2_P5MB6Rt3n",
        "appClientId": "g46ai8aa16bh0igf36q3simmo",
        "idOfTenantToWhichUsersAreInvitedTo": "f136a258-08c1-2e13-fe5f-b30987083c66"
    }
    ,
    {
        "email": "abhi.aec89@gmail.com",
        "domain": "gmail.com",
        "adminStatus": false,
        "userPoolId": "us-west-2_7ZI1CyRvy",
        "appClientId": "26r2ft47mqbnvcq1ers5s11dlm",
        "idOfTenantToWhichUsersAreInvitedTo": "f136a258-08c1-2e13-fe5f-b30987083c66"
    }
    ,
    {
        "email": "gkl@cleo.com",
        "domain": "cleo.com",
        "adminStatus": false,
        "userPoolId": "us-west-2_P5MB6Rt3n",
        "appClientId": "g46ai8aa16bh0igf36q3simmo",
        "idOfTenantToWhichUsersAreInvitedTo": "f136a258-08c1-2e13-fe5f-b30987083c66"
    }
]

let tenantId = 'f136a258-08c1-2e13-fe5f-b30987083c66';

let inviteeEmail = 'agupta@cleo.com';

processInviteRequests(tenantId, inviteeEmail, emailList);

function processInviteRequests(tenantId, inviteeEmail, emailList) {

    let unMarshalMemberRecords = [
        {
            "tenants": {
                "f136a258-08c1-2e13-fe5f-b30987083c66": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_P5MB6Rt3n",
            "authClientId": "g46ai8aa16bh0igf36q3simmo",
            "id": "724613dc-ea70-920c-440b-209f395d7358",
            "email": "agupta@cleo.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "beff3d0e-595e-ee0e-b37e-95f092d6ba2e": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_7ZI1CyRvy",
            "authClientId": "26r2ft47mqbnvcq1ers5s11dlm",
            "id": "0ed1d96c-273e-4d2e-1caa-9c58a206698b",
            "email": "abhi.aec89@gmail.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "beff3d0e-595e-ee0e-b37e-95f092d6ba2e": {
                    "memberStatus": "ENABLED",
                    "isAdmin": false
                }
            },
            "authPoolId": "us-west-2_7ZI1CyRvy",
            "authClientId": "26r2ft47mqbnvcq1ers5s11dlm",
            "id": "82f58dcf-9427-cfea-cd7a-8b9ea4b1a245",
            "email": "yogeetagup@gmail.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "f136a258-08c1-2e13-fe5f-b30987083c66": {
                    "memberStatus": "ENABLED",
                    "isAdmin": false
                }
            },
            "authPoolId": "us-west-2_P5MB6Rt3n",
            "authClientId": "g46ai8aa16bh0igf36q3simmo",
            "id": "57584c80-f968-cf47-b781-aec4edacfa42",
            "email": "preddy@cleo.com",
            "isMigrated": true
        }
    ]

    let welcomeOnlyUsers = [];

    let inviteOnlyUsers = [];

// check 1 is to clean the invite list for the presence of the inviter's email

    log.info(`Person Sending the invite is ${inviteeEmail} belonging to tenant with id ${tenantId}`);

    log.info(`Invite List before cleanUp InviteList To Remove The Inviters Email :`);

    displayRecords(emailList);

    emailList = cleanUpInviteListToRemoveTheInvitersEmail(emailList, inviteeEmail);

    log.info(`Invite List after cleanUp InviteList To Remove The Inviters Email :`);

    displayRecords(emailList);

// to clean the unMarshalMemberRecords for invite Flow

    if (emailList.length > 0) {

        log.info(`Member Records before cleanUp Member Records Which Are Not Part Of This InviteFlow :`);

        displayRecords(unMarshalMemberRecords);

        unMarshalMemberRecords = cleanUpMemberRecordsWhichAreNotPartOfThisInviteFlow(unMarshalMemberRecords, emailToUserPoolMap);

        log.info(`Member Records after cleanUp Member Records Which Are Not Part Of This InviteFlow :`);

        displayRecords(unMarshalMemberRecords);

        if (unMarshalMemberRecords.length > 0) {

            log.info(`Member Records before cleanUp Member Records Which Are Part Of Inviters Tenant :`);

            displayRecords(unMarshalMemberRecords);

            let tempRecords: any = cleanUpMemberRecordsWhichArePartOfInvitersTenant(unMarshalMemberRecords, tenantId);

            unMarshalMemberRecords = tempRecords.updatedMemberRecords;

            let currentTenantMembers = tempRecords.currentTenantMemberRecords;

            log.info(`Member Records after cleanUp Member Records Which Are Part Of Inviters Tenant :`);

            displayRecords(unMarshalMemberRecords);

            if (unMarshalMemberRecords.length > 0) {

                log.info(`emailToUserPoolMap before cleanUp InviteList To Remove Members Which Belongs To Inviters Tenant :`);

                displayRecords(emailToUserPoolMap);

                emailToUserPoolMap = cleanUpInviteListToRemoveMembersWhichBelongsToInvitersTenant(emailToUserPoolMap, currentTenantMembers);

                log.info(`emailToUserPoolMap after cleanUp InviteList To Remove Members Which Belongs To Inviters Tenant :`);

                displayRecords(emailToUserPoolMap);

                if (emailToUserPoolMap.length > 0) {

                    for (let emailCount = 0; emailCount < emailToUserPoolMap.length; emailCount++) {
                        if (isInArray(emailToUserPoolMap[emailCount].email, unMarshalMemberRecords)) {
                            welcomeOnlyUsers.push(emailToUserPoolMap[emailCount]);
                        } else {
                            inviteOnlyUsers.push(emailToUserPoolMap[emailCount]);
                        }
                    }

                } else {
                    log.error('After cleanUp InviteList To Remove Members Which Belongs To Inviter\'s Tenant: No Invite will be send as the invite list is empty!!!!!');
                }
            } else {
                log.error('After cleanUp Member Records Which Are Part Of Inviter\'s Tenant: This log indicates that the users who are invited are already part of the inviter\'s tenant');
            }
        } else {
            log.error('After cleanUp Member Records Which Are Not Part Of This Invite Flow: this log indicates that the users who are invited are not yet known to the system hence need to be invited');
            inviteOnlyUsers = emailList;
        }
    } else {
        log.error('After cleanUp InviteList To Remove The Inviter\'s Email: No Invite will be send as the invite list is empty!!!!!');
    }

    log.info(`Users to be Invited are`);
    displayRecords(inviteOnlyUsers);
    log.info(`Users to be Welcomed are`);
    displayRecords(welcomeOnlyUsers);
}