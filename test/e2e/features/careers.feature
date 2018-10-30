Feature: Careers Page

    @positive
    Scenario: User searches for a job by a keyword and skill
        Given I open base url
        When I type ".net" in "Job Search Section > Search Form > Keyword Input"
        And I remember text of "Job Search Section > Search Form > Location Input > Selected Location" as "$defaultLocation"
        And I click "Job Search Section > Search Form > Skills Input"
        And I wait until "Job Search Section > Search Form > Skills Input > Dropdown" is visible
        And I click "Software Test Engineering" text in "Job Search Section > Search Form > Skills Input > Dropdown > Skills"
        And I click "Job Search Section > Search Form > Find Button"
        And I wait until "Search Results Section > Search Results #1" is present
        And I click "Search Results Section > Search Results #1 > Apply Button"
        Then Text of "Job Header > Name" should contain "Test"
        And Text of "Job Header > Name" should contain ".NET"
        And Text of "Job Header > Locations #1" should contain "$defaultLocation"
        And "About Job > Job Description" should be visible
        And "About Job > Job Summary" should be visible

    @negative
    Scenario Outline: User types an unfinished location name in job search form and the form autocompletes it
        Given I open base url
        When I click "Job Search Section > Search Form > Location Input"
        And I type "<input>" in "Job Search Section > Search Form > Location Input > Dropdown > Input"
        And I type "ENTER" in "Job Search Section > Search Form > Location Input > Dropdown > Input"
        And I click "Job Search Section > Search Form > Find Button"
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
        When I type "!@#$%" in "Job Search Section > Search Form > Keyword Input"
        And I click "Job Search Section > Search Form > Find Button"
        And "Search Results Section > Error Message" should be visible
        And Text of "Search Results Section > Error Message" should equal "Sorry, your search returned no results. Please try another combination."