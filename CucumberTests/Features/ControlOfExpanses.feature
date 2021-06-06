Feature: Login Form

Scenario: Check the Login form
    Given My app has started
    And the Login form is visible
    When I enter "userName" and "password"
    Then I should see the message "Welcome", "userName"