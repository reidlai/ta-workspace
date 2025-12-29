Feature: Dashboard Loading and Navigation
  As a user
  I want to see the dashboard with available gadgets
  So that I can access different application features

  Scenario: Dashboard loads successfully with registered gadgets
    Given the application is initialized
    And the "Demo Gadget" is registered
    When I visit the dashboard page
    Then I should see the "Dashboard" title
    And I should see the "Demo Gadget" in the grid

  Scenario: Navigating from a gadget
    Given I am on the dashboard page
    When I click on the "Demo Gadget"
    Then I should be navigated to the "/demo" route
