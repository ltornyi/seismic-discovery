import dotenv from 'dotenv';
import readline from 'readline';

dotenv.config();

import { getAccessToken, updateCustomProperty, buildCascadePayload, buildDomainValuePayload, buildCustomPropertyPayload } from "./common.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//ask the user if they want to add C4 value and the new cascade rule before proceeding or not:
rl.question("Do you want to add the new value C4 and the new cascade rule to experimentalchild property? (yes/no): ", async (answer) => {
    const addC4 = answer.toLowerCase() === "yes";

    const cascadeRuleID = "a765d233-29ab-4040-8629-822044cd4a4a"; // replace with your actual rule ID
    const controllerPropertyId = "d6a5dc79-3e10-4654-9cdc-1b5f609dac36"; // replace with your actual controller property ID
    const controlledPropertyId = "5c704339-20c9-48df-9cc8-1472e8151584"; // replace with your actual controlled property ID


    const domainValues = [
        { id: "c339d7ce-329a-4d38-9f6c-9aa46729463f", value: "C1" },
        { id: "5d4055ba-0818-442a-8545-9e243de85bad", value: "C2" },
        { id: "ed51142d-e00b-4310-9285-ca76abbff53b", value: "C3" }
    ];
    if (addC4) {
        //this is the new value we are adding to experimentalchild property
        domainValues.push({ id: "1a7c4f5c-b7db-41bb-a6ee-98a0e3e12f78", value: "C4" });
    };

    const domainValuePayload = buildDomainValuePayload(domainValues);

    // console.dir(domainValuePayload, { depth: null });

    const valueIdPairs = [
        {controllerValueId: "fb34a737-c10d-408a-9dce-6e5ea81de4aa", allowedValueId: "c339d7ce-329a-4d38-9f6c-9aa46729463f"},
        {controllerValueId: "9f7ac576-7e23-4a44-aea4-baab535f29e5", allowedValueId: "5d4055ba-0818-442a-8545-9e243de85bad"},
        {controllerValueId: "9f7ac576-7e23-4a44-aea4-baab535f29e5", allowedValueId: "ed51142d-e00b-4310-9285-ca76abbff53b"}
    ];
    if (addC4) {
        //this is the new cascade rule we are adding: if experimentalparent = P2 -> experimentalchild can also be C4
        valueIdPairs.push({controllerValueId: "9f7ac576-7e23-4a44-aea4-baab535f29e5", allowedValueId: "1a7c4f5c-b7db-41bb-a6ee-98a0e3e12f78"});
    }

    const cascadePayload = buildCascadePayload(
        cascadeRuleID,
        controllerPropertyId,
        valueIdPairs
    );

    // console.dir(cascadePayload, { depth: null });
    // console.log(JSON.stringify(cascadePayload[0]).replace(/"/g, '\\"'));

    const customPropertyUpdatePayload = buildCustomPropertyPayload(
        controlledPropertyId,
        "experimentalchild",
        61,
        process.env.TEAMSITE,
        domainValuePayload,
        cascadePayload,
        process.env.DELEGATION_USER_ID
    );

    // console.dir(customPropertyUpdatePayload, { depth: null });

    try {
        const token = await getAccessToken(process.env.TOKEN_ENDPOINT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.DELEGATION_USER_ID, process.env.SCOPE);
        const updateResult = await updateCustomProperty(token, controlledPropertyId, customPropertyUpdatePayload);
        console.dir(updateResult, { depth: null });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        rl.close();
    }

});