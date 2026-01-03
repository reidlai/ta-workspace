import { Given, When, Then } from "@cucumber/cucumber";

let mockServiceRegistry = new Map();
let lastResult: any;

Given("the {string} is loaded", function (moduleName) {
  console.log(`${moduleName} loaded`);
});

When("the {string} registers a {string}", function (moduleName, serviceName) {
  mockServiceRegistry.set(serviceName, {
    greet: (name: string) => `Hello, ${name}!`,
  });
  console.log(`${moduleName} registered ${serviceName}`);
});

Then("the service registry should contain {string}", function (serviceName) {
  if (!mockServiceRegistry.has(serviceName)) {
    throw new Error(`Service ${serviceName} not found`);
  }
});

Given("the {string} is registered", function (serviceName) {
  mockServiceRegistry.set(serviceName, {
    greet: (name: string) => `Hello, ${name}!`,
  });
});

When(
  "the {string} invokes {string} with {string}",
  function (consumer, serviceMethod, arg) {
    const [serviceName, method] = serviceMethod.split(".");
    const service = mockServiceRegistry.get(serviceName);
    if (service && service[method]) {
      lastResult = service[method](arg);
    }
  },
);

Then("the result should be {string}", function (expected) {
  if (lastResult !== expected) {
    throw new Error(`Expected "${expected}", got "${lastResult}"`);
  }
});
