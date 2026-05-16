Feature: Validate comments REST API
    Scenario: Validate GET comments endpoint

        When I send a GET request to the comments endpoint and save the response as "GETonCommentsResponse"
        Then I should receive a successful response "GETonCommentsResponse" with status code 200
        Then I validate that the response body "GETonCommentsResponse" against the expected response and JSON schema defined in "comments"