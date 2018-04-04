import * as log from 'winston';
let memberRecords = {
    "authPoolId": "us-west-2_wFxjrr446",
    "tenants": {
        "a6b7345e-d4ba-12d0-30dc-be3074de11f3": {"memberStatus": "ENABLED", "isAdmin": true},
        "e9bf21fc-5269-4e5c-9b89-6bf3407d06b8": {"memberStatus": "ENABLED", "isAdmin": false}
    },
    "id": "c65ebb86-9ab4-6162-de15-a369e12bc75d",
    "email": "testUser.bvuadsg4@mailosaur.io",
    "isMigrated": true,
    "authClientId": "2t4uespibrsg6h00mgv1kpukkb"
};

let tenantRecords = [
    {
    "Items": [{
        "name": "mailosaurTenant2",
        "type": ["B2B"],
        "id": "a6b7345e-d4ba-12d0-30dc-be3074de11f3"
    }], "Count": 1, "ScannedCount": 1
    },
    {
    "Items": [{"name": "mailosaurTenant1", "type": ["DDF"], "id": "e9bf21fc-5269-4e5c-9b89-6bf3407d06b8"}],
    "Count": 1,
    "ScannedCount": 1
}];

function addTenantTypeToMemberRecords(memberRecords, tenantRecords) {
    if (!memberRecords ||(!tenantRecords || tenantRecords.length === 0)) {
        return null;
    }
    let memberTenantIds = Object.keys(memberRecords.tenants);
    for ( let tenantCount = 0; tenantCount < tenantRecords.length; tenantCount++ ) {
        for(let memberTenantCount = 0; memberTenantCount < memberTenantIds.length; memberTenantCount++) {
            if (tenantRecords[tenantCount].Items[0].id === memberTenantIds[memberTenantCount]) {
                memberRecords.tenants[memberTenantIds[memberTenantCount]].type = tenantRecords[tenantCount].Items[0].type;
            } else {
                continue;
            }
        }
    }
    // console.log(`Updated Finished Member Record is ${JSON.stringify(memberRecords)}`);
    return memberRecords;
};
console.log(` Original Member Record is ${JSON.stringify(memberRecords)}`);

let updatedMemberRecords = addTenantTypeToMemberRecords(memberRecords,tenantRecords);

console.log(`Updated Member Record after inclusion of type details are ${JSON.stringify(updatedMemberRecords)}`);