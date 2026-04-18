import sqlite3Init from 'sqlite3';
import crypto from 'crypto';

const sqlite3 = sqlite3Init.verbose();
const db = new sqlite3.Database('seismic-discovery.db');

db.run(`
    CREATE TABLE if not exists custom_properties(
        id TEXT PRIMARY KEY,
        name TEXT,
        _order INTEGER
    )
`);

db.run(`
    CREATE TABLE if not exists custom_property_domainvalues(
        id TEXT PRIMARY KEY,
        custom_property_id TEXT not null,
        value TEXT not null,
        _order INTEGER,
        FOREIGN KEY (custom_property_id) REFERENCES custom_properties(id)
    )
`);

db.run(`
    CREATE TABLE if not exists custom_property_value_cascades(
        id TEXT PRIMARY KEY,
        seismic_rule_id TEXT not null,
        controller_property_id TEXT not null,
        controlled_property_id TEXT not null,
        controller_value_id TEXT not null,
        allowed_value_id TEXT not null,
        FOREIGN KEY (controller_property_id) REFERENCES custom_properties(id),
        FOREIGN KEY (controlled_property_id) REFERENCES custom_properties(id),
        FOREIGN KEY (controller_value_id) REFERENCES custom_property_domainvalues(id),
        FOREIGN KEY (allowed_value_id) REFERENCES custom_property_domainvalues(id)
    )
`);

const insertCustomProperty = db.prepare(`
    INSERT INTO custom_properties(id, name, _order) VALUES (?, ?, ?)
`);
insertCustomProperty.run(['d6a5dc79-3e10-4654-9cdc-1b5f609dac36', 'experimentalparent', 60]);
insertCustomProperty.run(['5c704339-20c9-48df-9cc8-1472e8151584', 'experimentalchild', 61]);

const insertDomainValue = db.prepare(`
    INSERT INTO custom_property_domainvalues(id, custom_property_id, value, _order) VALUES (?, ?, ?, ?)
`);
insertDomainValue.run('fb34a737-c10d-408a-9dce-6e5ea81de4aa', 'd6a5dc79-3e10-4654-9cdc-1b5f609dac36', 'P1', 1);
insertDomainValue.run('9f7ac576-7e23-4a44-aea4-baab535f29e5', 'd6a5dc79-3e10-4654-9cdc-1b5f609dac36', 'P2', 2);
insertDomainValue.run('c339d7ce-329a-4d38-9f6c-9aa46729463f', '5c704339-20c9-48df-9cc8-1472e8151584', 'C1', 1);
insertDomainValue.run('5d4055ba-0818-442a-8545-9e243de85bad', '5c704339-20c9-48df-9cc8-1472e8151584', 'C2', 2);
insertDomainValue.run('ed51142d-e00b-4310-9285-ca76abbff53b', '5c704339-20c9-48df-9cc8-1472e8151584', 'C3', 3);

const insertCascade = db.prepare(`
    INSERT INTO custom_property_value_cascades (id, seismic_rule_id, controller_property_id, controlled_property_id, controller_value_id, allowed_value_id) VALUES (?, ?, ?, ?, ?, ?)
`);
insertCascade.run(crypto.randomUUID(), 'a765d233-29ab-4040-8629-822044cd4a4a', 'd6a5dc79-3e10-4654-9cdc-1b5f609dac36', '5c704339-20c9-48df-9cc8-1472e8151584', 'fb34a737-c10d-408a-9dce-6e5ea81de4aa', 'c339d7ce-329a-4d38-9f6c-9aa46729463f');
insertCascade.run(crypto.randomUUID(), 'a765d233-29ab-4040-8629-822044cd4a4a', 'd6a5dc79-3e10-4654-9cdc-1b5f609dac36', '5c704339-20c9-48df-9cc8-1472e8151584', '9f7ac576-7e23-4a44-aea4-baab535f29e5', '5d4055ba-0818-442a-8545-9e243de85bad');
insertCascade.run(crypto.randomUUID(), 'a765d233-29ab-4040-8629-822044cd4a4a', 'd6a5dc79-3e10-4654-9cdc-1b5f609dac36', '5c704339-20c9-48df-9cc8-1472e8151584', '9f7ac576-7e23-4a44-aea4-baab535f29e5', 'ed51142d-e00b-4310-9285-ca76abbff53b');

// Close the connection
db.close();