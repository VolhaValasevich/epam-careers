@footer
Feature: Copyright Footer

    Scenario Outline: Verify copyright links have correct text
        Given I open "https://www.sandisk.com/" url
        When I wait until "Copyright Footer" is present
        Then Text of "Copyright Footer > Copyright Links Bar > Copyright Links #<index>" should equal <text>

        Examples:
            | index | text                            |
            | 1     | "Legal"                         |
            | 2     | "Terms of Use"                  |
            | 3     | "Trademarks"                    |
            | 4     | "Privacy Statement"             |
            | 5     | "California Supply Chains Act"  |
            | 6     | "Your CA Privacy Rights"        |
            | 7     | "Taiwan BSMI RoHS"              |
            | 8     | "About Ads & Cookies Statement" |
