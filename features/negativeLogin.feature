
Feature: Login negative scenarios
    As a QA, I would like to verify all negative scenarios for login
    to verify that a error message is displayed and contains the expected texts.


  Scenario: Verify the error messages for all negative login scenarios
    Given I am on the signin page
    When I click on the signin button
    And I enter "<email>" as the email
    And I attempt to login
    Then I should get an error message "<error>"

    Examples:
        | email | password | error |
        | invalidusername  |  | We don’t recognise that email or username. You can try again or register for an account |
        