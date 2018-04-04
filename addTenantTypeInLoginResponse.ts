import * as log from 'winston';

let filteredTenantRecordsOfMember = {
    "0266c22d-9ac0-a1a9-665b-4c31b78d1293": {
        "memberStatus": "ENABLED",
        "isAdmin": false,
        "name": "mailosaurTenant"
    }
};

let tenantTableRecords = [{
    "Items": [{
        "name": "mailosaurTenant",
        "type": "DDF",
        "id": "0266c22d-9ac0-a1a9-665b-4c31b78d1293"
    }], "Count": 1, "ScannedCount": 1
}]

function addTenantTypeToLoginResponse(memberRecords, tenantRecords) {
    if (!memberRecords ||(!tenantRecords || tenantRecords.length === 0)) {
        return null;
    }
    let memberTenantIds = Object.keys(memberRecords);
    for ( let tenantCount = 0; tenantCount < tenantRecords.length; tenantCount++ ) {
        for(let memberTenantCount = 0; memberTenantCount < memberTenantIds.length; memberTenantCount++) {
            if (tenantRecords[tenantCount].Items[0].id === memberTenantIds[memberTenantCount]) {
                memberRecords[memberTenantIds[memberTenantCount]].type = tenantRecords[tenantCount].Items[0].type;
            } else {
                continue;
            }
        }
    }
    // console.log(`Updated Finished Member Record is ${JSON.stringify(memberRecords)}`);
    return memberRecords;
};

console.log(` Original Member Record is ${JSON.stringify(filteredTenantRecordsOfMember)}`);

let updatedMemberRecords = addTenantTypeToLoginResponse(filteredTenantRecordsOfMember,tenantTableRecords);

console.log(`Updated Member Record after inclusion of type details are ${JSON.stringify(updatedMemberRecords)}`);