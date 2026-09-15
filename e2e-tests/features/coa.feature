@CoaRegression
@CoaRegressionCI
Feature: COA - Change of Address

  Scenario Outline: Change of Address journey form for E2E test
    Given I visit the Change of Address page
    And I go through the starter pages
    When I fill out the answers to change of address form pertaining to "<COA Test>" happy path test
    Then I am navigated to "Update submitted" page
    Examples:
      | COA Test                                                                                |
      | T1: Applicant who needs to change their address                                         |
      | T2: Legal Representative who needs to change the address of person they're representing |
      | T3: Someone else who needs to change the address of a person                            |
      | T4: Applicant who needs to change their postal address                                  |
      | T5: Applicant who needs to change their address                                         |
      | T6: Legal Representative who needs to change the address of a person and their own      |
      | T7: Legal Representative who needs to change their own address                          |