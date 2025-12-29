Feature: Module Service Discovery and Invocation
  As a developer
  I want modules to export and discover services
  So that modules can communicate and share functionality

  Scenario: Module exports a service
    Given the "Demo Module" is loaded
    When the "Demo Module" registers a "DemoService"
    Then the service registry should contain "DemoService"

  Scenario: Another module invokes a service
    Given the "DemoService" is registered
    When the "Dashboard" invokes "DemoService.greet" with "World"
    Then the result should be "Hello, World!"
