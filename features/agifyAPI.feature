Feature: Validate Agify API Functionality

  Scenario: Fetch age data for a valid name
    Given the API endpoint is "https://api.agify.io/"
    When I query with the name "serafina"
    Then the response should include "name" as "serafina"
    And the response should include "age" as a number
    And the response should include "count" as 1

  Scenario: Handle empty name parameter
    Given the API endpoint is "https://api.agify.io/"
    When I query with an empty name
    Then the response status should be 400
    And the response should include "count" as 0
    And the response should include "name" as ""
    And the response should include "age" as null

  Scenario: Handle names with non-alphabetical characters
    Given the API endpoint is "https://api.agify.io/"
    When I query with the name "12345"
    Then the response should include "name" as "12345"
    And the response should include "count" as 0
    And the response should include "age" as null

  Scenario: Handle names with special characters
    Given the API endpoint is "https://api.agify.io/"
    When I query with the name "!@#$%"
    Then the response should include "name" as "!@#$%"
    And the response should include "count" as 0
    And the response should include "age" as null

  Scenario: Handle very long names
    Given the API endpoint is "https://api.agify.io/"
    When I query with the name "averyverylongnameexceedinglimits"
    Then the response status should be 200
    And the response should include "name" as "averyverylongnameexceedinglimits"
    And the response should include "age" as null

  Scenario: Validate response headers
    Given the API endpoint is "https://api.agify.io/"
    When I query with the name "testname"
    Then the response should include the header "Content-Type" as "application/json"

  Scenario: Test for SQL injection attack
    Given the API endpoint is "https://api.agify.io/"
    When I query with the name "' OR '1'='1"
    Then the response should include "name" as "' OR '1'='1"
    And the response should include "age" as null

  Scenario: Test for Cross-Site Scripting (XSS)
    Given the API endpoint is "https://api.agify.io/"
    When I query with the name "<script>alert('xss')</script>"
    Then the response should include "name" as "<script>alert('xss')</script>"
    And the response should include "age" as null

  Scenario: Handle invalid query parameters
  Given the API endpoint is "https://api.agify.io/"
  When I query with the parameters:
    | key      | value                  |
    | api_key  | 11111                  |
    | name     | "name=John&age=30"     |
  Then the response status should be 422
  And the response should include "error" as "Unprocessable Entity"

  Scenario: Handle request limit reached error
  Given the API endpoint is "https://api.agify.io/"
  When I query with the name ""
  Then the response should include "error" as "Request limit reached" when limit is reached
