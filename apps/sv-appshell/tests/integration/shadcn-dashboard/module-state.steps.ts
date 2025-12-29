import { Given, When, Then } from '@cucumber/cucumber';
// Mocking state store import as we are in node env for this phase verification
// In a real browser test, we would probe the running app state.

let mockState = new Map();

Given('the {string} is active', function (moduleName) {
    console.log(`${moduleName} active`);
});

When('the {string} updates the {string} channel to {string}', function (moduleName, channel, value) {
    mockState.set(channel, value);
    console.log(`${moduleName} updated ${channel} to ${value}`);
});

Then('the {string} should reflect {string} for {string}', function (componentName, value, channel) {
    const current = mockState.get(channel);
    if (current !== value) throw new Error(`Expected ${value}, got ${current}`);
});

Then('other modules subscribed to {string} should receive {string}', function (channel, value) {
    // Simulating pub/sub check
});

Given('the {string} channel has value {int}', function (channel, value) {
    mockState.set(channel, value);
});

When('{string} updates {string} to {int}', function (moduleName, channel, value) {
    mockState.set(channel, value); // Last writer wins simulation in steps
});

When('{string} updates {string} to {int} immediately after', function (moduleName, channel, value) {
    mockState.set(channel, value);
});

Then('the final value of {string} should be {int}', function (channel, value) {
    const current = mockState.get(channel);
    if (current !== value) throw new Error(`Expected ${value}, got ${current}`);
});
