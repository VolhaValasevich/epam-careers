Feature: Careers Page

    @positive
    Scenario: User searches for a job by a keyword and skill
        Given I open base url
        When I type ".net" in "Keyword Input"
        And I remember text of "Selected Location" as "$defaultLocation"
        And I click "Skills Input"
        And I wait until "Skills Input > Dropdown" is clickable
        And I click "Software Test Engineering" text in "Skills Input > Dropdown > Skills"
        And I click "Find Button"
        And I wait until "Search Results Section > Search Results #1" is present
        And I click "Search Results Section > Search Results #1 > Apply Button"
        Then Text of "Job Header > Name" should contain "Test"
        And Text of "Job Header > Name" should contain ".NET"
        And Text of "Job Header > Locations #1" should contain "$defaultLocation"
        And "About Job > Description" should be visible
        And "About Job > Summary" should be visible

    @negative
    Scenario Outline: User types "<input>" in job search form and the form autocompletes it to <location>
        Given I open base url
        When I click "Location Input"
        And I type "<input>" in "Location Input > Dropdown > Input"
        And I type "ENTER" in "Location Input > Dropdown > Input"
        And I click "Find Button"
        And I wait until "Search Results Section > Search Results #1" is present
        And I click "Search Results Section > Search Results #1 > Apply Button"
        Then Text of "Job Header > Locations #1" should contain "<location>"

        Examples:
            | input | location |
            | mi    | Minsk    |
            | go    | Gomel    |
            | bre   | Brest    |
            | gr    | Grodno   |
            | vi    | Vitebsk  |

    @negative
    Scenario: User searches for an inexistent keyword and sees an error message
        Given I open base url
        When I type "!@#$%" in "Keyword Input"
        And I click "Find Button"
        And "Error Message" should be visible
        And Text of "Error Message" should equal "Sorry, your search returned no results. Please try another combination."