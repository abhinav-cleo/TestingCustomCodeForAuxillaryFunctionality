import * as log from 'winston'

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

function cleanUpInviteListToRemoveMembersWhichBelongsToInvitersTenant(inviteesEmailToUserPoolMap, membersRecordsForUserBelongingToInvitersTenant) {
    if (inviteesEmailToUserPoolMap.length === 0 || membersRecordsForUserBelongingToInvitersTenant.length === 0) {
        return null;
    }

    if (membersRecordsForUserBelongingToInvitersTenant.length >= inviteesEmailToUserPoolMap.length) {
        for (let count = 0; count < membersRecordsForUserBelongingToInvitersTenant.length; count++) {
            for (let ncount = 0; ncount < inviteesEmailToUserPoolMap.length; ncount++) {
                if (inviteesEmailToUserPoolMap[ncount].email === membersRecordsForUserBelongingToInvitersTenant[count]) {
                    delete inviteesEmailToUserPoolMap[ncount];
                } else {
                    continue;
                }
            }
        }
    } else {
        for (let count = 0; count < inviteesEmailToUserPoolMap.length; count++) {
            for (let ncount = 0; ncount < membersRecordsForUserBelongingToInvitersTenant.length; ncount++) {
                if (inviteesEmailToUserPoolMap[count].email === membersRecordsForUserBelongingToInvitersTenant[ncount]) {
                    delete inviteesEmailToUserPoolMap[count];
                } else {
                    continue;
                }
            }
        }
    }

    inviteesEmailToUserPoolMap = inviteesEmailToUserPoolMap.filter(function (el) {
        return el !== null;
    });

    return inviteesEmailToUserPoolMap;
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

    let inviterTenantMembers = [];
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

    if (array.length === 0) {
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
        "email": "preddy@cleo.com",
        "adminStatus": false
    }
]

let emailToUserPoolMap = [
    {
        "email": "preddy@cleo.com",
        "domain": "cleo.com",
        "adminStatus": false,
        "userPoolId": "us-west-2_tFLJHchQO",
        "appClientId": "242q6ock190qesombqan6o9u0u",
        "idOfTenantToWhichUsersAreInvitedTo": "e1b9bfee-07cb-92c0-7ba5-139fe7c74a15"
    }
]

let tenantId = 'e1b9bfee-07cb-92c0-7ba5-139fe7c74a15';

let inviteeEmail = '77pratap@gmail.com';

processInviteRequests(tenantId, inviteeEmail, emailList);

function processInviteRequests(tenantId, inviteeEmail, emailList) {

    let unMarshalMemberRecords = [
        {
            "tenants": {
                "e1b9bfee-07cb-92c0-7ba5-139fe7c74a15": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_PJ4wW4n61",
            "authClientId": "49bohv3uoa86jk2okcog166o8h",
            "id": "d0fba56c-b203-f664-ea5e-2749df3daab5",
            "email": "pratap578.vvs@gmail.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "d376b35d-1d97-5774-e9f3-d34efe38bff7": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_tFLJHchQO",
            "authClientId": "242q6ock190qesombqan6o9u0u",
            "id": "0b66cd64-9976-9e2d-c3a7-96fae4b2820f",
            "email": "preddy@cleo.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "d376b35d-1d97-5774-e9f3-d34efe38bff7": {
                    "memberStatus": "ENABLED",
                    "isAdmin": false
                }
            },
            "authPoolId": "us-west-2_tFLJHchQO",
            "authClientId": "242q6ock190qesombqan6o9u0u",
            "id": "57e86ac7-a858-e75a-063b-52e79c86c101",
            "email": "agupta@cleo.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "d376b35d-1d97-5774-e9f3-d34efe38bff7": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_tFLJHchQO",
            "authClientId": "242q6ock190qesombqan6o9u0u",
            "id": "9c80bcfb-7f0e-2dec-72fe-1d7b7965908d",
            "email": "dgaikwad@cleo.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "e1b9bfee-07cb-92c0-7ba5-139fe7c74a15": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_PJ4wW4n61",
            "authClientId": "49bohv3uoa86jk2okcog166o8h",
            "id": "74eeba2e-5344-5c4b-1a1e-9dafa23999ee",
            "email": "77pratap@gmail.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "e1b9bfee-07cb-92c0-7ba5-139fe7c74a15": {
                    "memberStatus": "ENABLED",
                    "isAdmin": true
                }
            },
            "authPoolId": "us-west-2_PJ4wW4n61",
            "authClientId": "49bohv3uoa86jk2okcog166o8h",
            "id": "e673029d-13a8-5da5-ea3e-18c948bfeb31",
            "email": "vvs.pratap@gmail.com",
            "isMigrated": true
        }
        ,
        {
            "tenants": {
                "e1b9bfee-07cb-92c0-7ba5-139fe7c74a15": {
                    "memberStatus": "ENABLED",
                    "isAdmin": false
                }
            },
            "authPoolId": "us-west-2_PJ4wW4n61",
            "authClientId": "49bohv3uoa86jk2okcog166o8h",
            "id": "bccc1e63-2c21-2581-3d19-ef0b9a692e70",
            "email": "pratap999@gmail.com",
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

    if (emailList && emailList.length > 0) {

        log.info(`Member Records before cleanUp Member Records Which Are Not Part Of This InviteFlow :`);

        displayRecords(unMarshalMemberRecords);

        unMarshalMemberRecords = cleanUpMemberRecordsWhichAreNotPartOfThisInviteFlow(unMarshalMemberRecords, emailToUserPoolMap);

        log.info(`Member Records after cleanUp Member Records Which Are Not Part Of This InviteFlow :`);

        displayRecords(unMarshalMemberRecords);

        if (unMarshalMemberRecords && unMarshalMemberRecords.length > 0) {

            log.info(`Member Records before cleanUp Member Records Which Are Part Of Inviters Tenant :`);

            displayRecords(unMarshalMemberRecords);

            let tempRecords: any = cleanUpMemberRecordsWhichArePartOfInvitersTenant(unMarshalMemberRecords, tenantId);

            unMarshalMemberRecords = tempRecords.updatedMemberRecords;

            let currentTenantMembers = tempRecords.currentTenantMemberRecords;

            log.info(`Member Records after cleanUp Member Records Which Are Part Of Inviters Tenant :`);

            displayRecords(unMarshalMemberRecords);

            if (unMarshalMemberRecords && unMarshalMemberRecords.length > 0) {

                log.info(`emailToUserPoolMap before cleanUp InviteList To Remove Members Which Belongs To Inviters Tenant :`);

                displayRecords(emailToUserPoolMap);

                if (currentTenantMembers && currentTenantMembers.length > 0) {
                    emailToUserPoolMap = cleanUpInviteListToRemoveMembersWhichBelongsToInvitersTenant(emailToUserPoolMap, currentTenantMembers);
                }

                log.info(`emailToUserPoolMap after cleanUp InviteList To Remove Members Which Belongs To Inviters Tenant :`);

                displayRecords(emailToUserPoolMap);

                if (emailToUserPoolMap && emailToUserPoolMap.length > 0) {

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