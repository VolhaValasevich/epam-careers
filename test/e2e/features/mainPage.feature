@main
Feature: Main Page

    @slider
    Scenario Outline: User can switch slides
        Given I open "https://www.sandisk.com/" url
        When I click "Slider Section > Buttons #<index>"
        And I wait until "Slider Section > Slides #<index>" is present
        Then Text of "Slider Section > Slides #<index> > Title" should equal <title>
        And "Slider Section > Slides #<index> > Button" should be visible

        Examples:
            | index | title                                              |
            | 1     | "iXPAND MINI"                                      |
            | 2     | "PERFORMANCE FOR DATA-CENTRIC APPLICATIONS"        |
            | 3     | "A NEW DIMENSION OF STORAGE"                       |
            | 4     | "INCREASE PRODUCTIVITY AND LOWER TCO IN THE CLOUD" |

    @search
    Scenario: User can perform search in the main search bar
        Given I open "https://www.sandisk.com/" url
        When I type "text" in "Search Section > Search Input"
        And I click "Search Section > Search Submit Button"
        Then Page title should be "SanDisk Search Results"
        And "Search Results Section > Results Number" should be visible

    Scenario Outline: User can click on buttons in the main section
        Given I open "https://www.sandisk.com/" url
        When I click "Main Section > <button> Button"
        Then Page title should be <title>

        Examples:
            | button    | title                                                       |
            | Home     | "Global Leader in Flash Memory Storage Solutions \| SanDisk"|
            | Business | "For Business - Sandisk Flash Storage Solutions"            |
            | OEM      | "Sandisk - OEM Design Solutions"                            |