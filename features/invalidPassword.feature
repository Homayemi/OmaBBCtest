
Feature: Login negative scenarios
    As a QA, I would like to verify all negative scenarios for login
    to verify that a error message are displayed when the user logs in invalid passwords.


  Scenario: Verify the error messages for all negative login scenarios
    Given I am on the signin page
    When I click on the signin button
    And I enter "<email>" as the email
    And I attempt to login
    And I enter "<password>" as the password
    And I attempt to login
    Then I should get an error message "<error>"

    Examples:
        | email | password | error |
        | awaniomayemi@gmail.com|  hgf |Sorry, that password is too short. It needs to be eight characters or more.|