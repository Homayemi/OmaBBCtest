
Feature: As a business user, I would like to make a record of all teams which are playing today

  Scenario: Output all team names with a match today or a message if no matches
    Given there are matches today
    When I want the names of the teams playing today
    Then I should get the list of the teams playing today