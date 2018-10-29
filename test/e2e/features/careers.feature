Feature: Careers Page

    Scenario: User searches for a job by its ID
        Given I open base url
        When I type "35185" in "Job Search Section > Search Form > Keyword Input"
        And I click "Job Search Section > Search Form > Find Button"
        Then Page title should be "Job Listings"
        And Count of "Search Results Section > Search Results" should be "1"
        And Text of "Search Results Section > Search Results #1 > Name" should equal ".NET Back-end Developer"