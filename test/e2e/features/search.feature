@search
Feature: Search Page

    Scenario: User can search for a keyword and see results
        Given I open "https://www.sandisk.com/tools/search" url
        When I type "ixpand" in "Search Section > Search Input"
        And I click "Search Section > Search Submit Button"
        Then "Search Results Section > Results Number" should be visible
        And "Search Results Section > Next Button" should be visible
        And Text of "Search Results Section > Results #1 > Title" should contain "IXpand"

    Scenario: User can see autosuggestion if nothing was found for a keyword
        Given I open "https://www.sandisk.com/tools/search" url
        When I type "phhhone" in "Search Section > Search Input"
        And I click "Search Section > Search Submit Button"
        Then "Search Results Section > Autosuggestion" should be visible
        And Text of "Search Results Section > Autosuggestion > Suggestions #1" should equal "phone"

    Scenario: User can use autosuggestion for search
        Given I open "https://www.sandisk.com/tools/search" url
        When I type "phhhone" in "Search Section > Search Input"
        And I click "Search Section > Search Submit Button"
        And I click "Search Results Section > Autosuggestion > Suggestions #1"
        Then "Search Results Section > Results Number" should be visible
        And "Search Results Section > Next Button" should be visible
        And Text of "Search Results Section > Results #1 > Title" should contain "Phone"

    Scenario: User can see next page with results
        Given I open "https://www.sandisk.com/tools/search" url
        When I type "ixpand" in "Search Section > Search Input"
        And I click "Search Section > Search Submit Button"
        And I click "Search Results Section > Next Button"
        Then Text of "Search Results Section > Results Number" should equal "RESULTS 11 - 20"
        And "Search Results Section > Previous Button" should be visible

    Scenario: User can return to previous page with results
        Given I open "https://www.sandisk.com/tools/search" url
        When I type "ixpand" in "Search Section > Search Input"
        And I click "Search Section > Search Submit Button"
        And I click "Search Results Section > Next Button"
        And I click "Search Results Section > Previous Button"
        Then Text of "Search Results Section > Results Number" should equal "RESULTS 1 - 10"
        And "Search Results Section > Previous Button" should not be visible