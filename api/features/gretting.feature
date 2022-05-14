Feature: USERS
  We will check different scenarios in users


  Scenario: I should add a user admin
    Given I have parameters
      | name | gachet |
      | email | antoine@gmail.com |
      | password | 123456 |
      | firstname | antoine |
      | role | admin |
    When I request "POST" "/v1/users/register" with parameters
    Then I should receive a 201 status code

  Scenario: I log with user admin
    Given I have parameters
      | email | antoine@gmail.com |
      | password | 123456 |
    When I request "POST" "/v1/users/login" with parameters
    Then I should receive a 200 status code

  Scenario: I get all users
    Given I am log as admin
      When I request "GET" "/v1/users"
      Then I should receive a 200 status code

  Scenario: I get specific user
    Given I am log as admin
      When I request "GET" "/v1/users/gachet"
      Then I should receive a 200 status code

  Scenario: I delete specific user
    Given I am log as admin
      When I request "DELETE" "/v1/users/delete/gachet"
      Then I should receive a 200 status code

  Scenario: I should add a user
    Given I have parameters
      | name | gachet |
      | email | antoine@gmail.com |
      | password | 123456 |
      | firstname | antoine |
      | role | user |
    When I request "POST" "/v1/users/register" with parameters
    Then I should receive a 201 status code

  Scenario: I get all users
    Given I am log as admin
      When I request "GET" "/v1/users"
      Then I should receive a 200 status code

  Scenario: I get specific user
    Given I am log as admin
      When I request "GET" "/v1/users/gachet"
      Then I should receive a 200 status code

  Scenario: I delete specific user
    Given I am log as admin
      When I request "DELETE" "/v1/users/delete/gachet"
      Then I should receive a 401 status code