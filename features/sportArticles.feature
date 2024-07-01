
Feature: Search for Sport
  As a sports user, 
  I would like to search all articles related to "sports"

   Scenario: handling any popup that might get displayed
    Given I am on the BBC homepage
    When I close any popup if present
    When I search for the title "sport"
    Then I should get the first and the last headings of the search results

  Scenario: Output the first heading and the last heading returned on the page
    Given I am on the BBC homepage
    When I close any popup if present
    When I search for the title "sport"
    Then I should get the first and the last headings of the search results