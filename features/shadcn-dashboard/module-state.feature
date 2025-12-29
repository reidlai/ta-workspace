Feature: Module State Synchronization
  As a developer
  I want modules to share state reactively
  So that gadgets can interact with each other and the shell

  Scenario: Module updates shared state
    Given the application is initialized
    And the "Demo Module" is active
    When the "Demo Module" updates the "user.status" channel to "Active"
    Then the "Dashboard" should reflect "Active" for "user.status"
    And other modules subscribed to "user.status" should receive "Active"

  Scenario: Simultaneous state updates (Last-Writer-Wins)
    Given the "user.score" channel has value 0
    When "Module A" updates "user.score" to 10
    And "Module B" updates "user.score" to 20 immediately after
    Then the final value of "user.score" should be 20
