@CoaRegression
@COA-V

Feature: COA - Change of Address Validate

#  Applicant details page
#  Who are you? page
#  Contact details page
  Scenario: COA Test-1 Validate the above pages
    Given I visit the Change of Address page
    When I choose to navigate to "Applicant details" page for COA
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter the applicant's full name¬Enter the applicant's date of birth¬Enter a country of nationality" error summary
# Applicant details page
# Unique application number (optional) should be more than 16 numeric value
    When I choose to enter "123456789012345" in the "Unique application number (optional)" field on Applicant details page for COA
    And I should see "Unique application number must be more than 15 numbers" error summary
    When I choose to enter "1234567890123456" in the "Unique application number (optional)" field on Applicant details page for COA
#  Who are you? page
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us who you are" error summary
    When I choose to select "Yes" on "Who are you?" page and choose to continue for COA
#  Contact details page
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter an email address" error summary
#Entered less than 3 characters, Email address @ symbol at the end, enter invalid uk telephone number, more than 2000 characters entered for address
    When I complete the fields below with Contact details for COA:
      | Email address               | TesterTlf.com@ |
      | Telephone number (optional) | -48081570192   |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email address¬Please enter a valid telephone number" error summary
#Enter email address short less than 6 characters and enter invalid UK telephone number 12 digits
    When I complete the fields below with Contact details for COA:
      | Email address               | T@t.c        |
      | Telephone number (optional) | 016148081588 |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email address¬Please enter a valid telephone number" error summary
#Enter email does not have @ symbol
    When I complete the fields below with Contact details for COA:
      | Email address               | TesterTlf.com |
      | Telephone number (optional) | 01614808158   |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email address" error summary
    When I complete the fields below with Contact details for COA:
      | Email address               | Tester@Tlf.com |
      | Telephone number (optional) | 01614808158    |




# Contact details page
# Identity document number page
# Upload proof of identity page
#  Which details are you updating? page
# Upload letter of authority page
  Scenario: COA Test-2 Validate the above pages
    Given I visit the Change of Address page
    When I choose to navigate to "Contact details legal representative" page for COA
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter an email address" error summary
  #Entered less than 3 characters, Email address @ symbol at the end, enter invalid uk telephone number, more than 2000 characters entered for address
    When I complete the fields below with Contact details for legal representative for COA:
      | Email address                        | TesterTlf.com@ |
      | Telephone number (optional)          | -48081570192   |
      | Client’s email address (optional)    | TesterTlf.com@ |
      | Client’s telephone number (optional) | -48081570192   |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email address¬Enter a valid UK telephone number¬Enter a valid email address¬Please enter a valid telephone number" error summary
#Enter email address short less than 6 characters and enter invalid UK telephone number 12 digits
    When I complete the fields below with Contact details for legal representative for COA:
      | Email address                        | T@t.c        |
      | Telephone number (optional)          | 016148081588 |
      | Client’s email address (optional)    | T@t.c        |
      | Client’s telephone number (optional) | 016148081588 |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email address¬Enter a valid UK telephone number¬Enter a valid email address¬Please enter a valid telephone number" error summary
#Enter email does not have @ symbol
    When I complete the fields below with Contact details for legal representative for COA:
      | Email address                        | TesterTlf.com |
      | Telephone number (optional)          | 01614808158   |
      | Client’s email address (optional)    | TesterTlf.com |
      | Client’s telephone number (optional) | 01614808158   |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a valid email address¬Enter a valid email address" error summary
    When I complete the fields below with Contact details for legal representative for COA:
      | Email address                        | Tester@Tlf.com |
      | Telephone number (optional)          | 01614808158    |
      | Client’s email address (optional)    | Tester@Tlf.com |
      | Client’s telephone number (optional) | 01614808158    |
#No data entered in any of the fields
#  Identity document number page
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Select which identity document number you can provide" error summary
    When I choose to select "None of these" on "Identity document number" page and choose to continue for COA
#Upload proof of identity page
#No file selected
    And I select save and continue on upload photo
    Then I should see "There is a problem" error message displayed
    And I should see "Select a file to upload" error summary
#Upload a photo of yourself page: Upload the same file name again
    When I choose to upload "yourself1.JPEG" file
    And I choose to upload another "yourself1.JPEG" file
    Then I should see "There is a problem" error message displayed
    And I should see "You have already uploaded a file named 'yourself1.JPEG'. Change this file's name or upload a different file." error summary
#Upload a photo of yourself page: File size too large when file size is greater than 20MB
    When I choose to upload "yourself25Mb.pdf" file
    Then I should see "Your file must be smaller than 25MB" error for max upload file
#Upload a photo of yourself page: Incorrect file type, your photo must be a JPG, PNG, GIF,  JPEG or PDF file
    When I choose to upload "text.txt" file
    Then I should see "Your file must be a JPG, JPEG, PNG or PDF" error for type of uploaded file
    When I choose to upload "yourself1.JPEG" file
    And I select save and continue on upload photo
#  Which details are you updating? page
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us which details you want to update" error summary
    When I choose to select "Legal representative" on "Which details are you updating?" page and choose to continue for COA
#  Enter your legal representative’s details page
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter an OISC or SRA number in the correct format, for example F123456789 or 123456¬Enter your house number or name¬Enter your town or city¬Enter your UK postcode" error summary
#OISC or SRA number in the correct format and Postcode entered in an invalid UK format
    When I complete the fields below with Enter your legal representative’s details for COA:
      | Company name       | LTD       |
      | OISC or SRA number | 1234      |
      | Address line 1     | 12        |
      | Address line 2     | less than |
      | Town or City       | Leeds     |
      | County             | Yolkshire |
      | Postcode           | 2L 1PP    |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter an OISC or SRA number in the correct format, for example F123456789 or 123456¬Enter a real UK postcode" error summary
#OISC or SRA number in the correct format and Postcode entered contains special characters (not including whitespace)
    When I complete the fields below with Enter your legal representative’s details for COA:
      | Company name       | 12      |
      | OISC or SRA number | F1234   |
      | Address line 1     | 12      |
      | Address line 2     | Kings   |
      | Town or City       | Leeds   |
      | County             | Leeds   |
      | Postcode           | L1! 1PP |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter an OISC or SRA number in the correct format, for example F123456789 or 123456¬Enter a real UK postcode" error summary
    When I complete the fields below with Enter your legal representative’s details for COA:
      | Company name       | 12         |
      | OISC or SRA number | F123456789 |
      | Address line 1     | 12         |
      | Address line 2     | Kings      |
      | Town or City       | Leeds      |
      | County             |            |
      | Postcode           | L12 1PP    |
#Upload letter of authority page
#No file selected
    And I select save and continue on upload photo
    Then I should see "There is a problem" error message displayed
    And I should see "Select a file to upload" error summary
#Upload more than one file error
    When I choose to upload "yourself.png" file
    And I choose to upload another "yourself1.JPEG" file
    Then I should see "There is a problem" error message displayed
    And I should see "You can only upload 1 file. Remove the file before uploading a different one" error summary
#Upload a photo of yourself page: File size too large when file size is greater than 20MB
    When I choose to upload "yourself25Mb.pdf" file
    Then I should see "Your file must be smaller than 25MB" error for max upload file
#Upload a photo of yourself page: Incorrect file type, your photo must be a JPG, PNG, GIF,  JPEG or PDF file
    When I choose to upload "text.txt" file
    Then I should see "Your file must be a JPG, JPEG, PNG or PDF" error for type of uploaded file
    When I choose to upload "yourself1.JPEG" file
    And I select save and continue on upload photo
    Then I am navigated to "Check your answers" page










#  Is your old home address in the UK? page
#  What is your new home address? page
#  Upload proof of address page
#  Do you want to make the same changes to your dependant's details page
#  Which dependant would you like to make the same changes to? page
  Scenario: COA Test-3 Validate the above pages
    Given I visit the Change of Address page
    When I choose to navigate to "Is your old home address in the UK?" page for COA
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us whether your old home address is in the UK" error summary
    When I choose to select "Yes" on "Is your old home address in the UK?" page and choose to continue for COA


#  What is your new home address? page
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter your house number or name¬Enter your town or city¬Enter your UK postcode" error summary
#Postcode entered in an invalid UK format
    When I complete the fields below with What is your new home address details for COA:
      | Address line 1 | 12        |
      | Address line 2 | Test      |
      | Town or City   | Leeds     |
      | County         | Yolkshire |
      | Postcode       | 2L 1PP    |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real UK postcode" error summary
#Postcode entered contains special characters (not including whitespace)
    When I complete the fields below with What is your new home address details for COA:
      | Address line 1 | 12      |
      | Address line 2 |         |
      | Town or City   | Leeds   |
      | County         | Leeds   |
      | Postcode       | L1! 1PP |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real UK postcode" error summary
    When I complete the fields below with What is your new home address details for COA:
      | Address line 1 | 12      |
      | Address line 2 | Kings   |
      | Town or City   | Leeds   |
      | County         |         |
      | Postcode       | L12 1PP |


# Upload proof of address page
#No file selected
    And I select save and continue on upload photo
    Then I should see "There is a problem" error message displayed
    And I should see "Select a file to upload" error summary
#Upload a photo of yourself page: Upload the same file name again
    When I choose to upload "yourself1.JPEG" file
    And I choose to upload another "yourself1.JPEG" file
    Then I should see "There is a problem" error message displayed
    And I should see "You have already uploaded a file named 'yourself1.JPEG'. Change this file's name or upload a different file." error summary
#Upload a photo of yourself page: File size too large when file size is greater than 20MB
    When I choose to upload "yourself25Mb.pdf" file
    Then I should see "Your file must be smaller than 25MB" error for max upload file
#Upload a photo of yourself page: Incorrect file type, your photo must be a JPG, PNG, GIF,  JPEG or PDF file
    When I choose to upload "text.txt" file
    Then I should see "Your file must be a JPG, JPEG, PNG or PDF" error for type of uploaded file
    When I choose to upload "yourself1.JPEG" file
    And I select save and continue on upload photo

#  Do you want to make the same changes to your dependant's details page
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Select an option" error summary
    When I choose to select "Yes" on "Do you want to make the same changes to your dependant's details" page and choose to continue for COA


#  Which dependant would you like to make the same changes to? page
#No data entered in any of the fields
    And I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a full name¬Enter the dependant's date of birth in the correct format; for example, 31 3 1980¬Enter a nationality" error summary
#Dob invalid format
    When I complete the fields below with Which dependant would you like to make the same changes to details for COA:
      | Full name              | Ho         |
      | Date of Birth          | 32/01/2008 |
      | Country of nationality | Finland    |
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real date of birth" error summary
#Dob in the future
    When I complete the fields below with Which dependant would you like to make the same changes to details for COA:
      | Full name              | Ho              |
      | Date of Birth          | Tomorrow's date |
      | Country of nationality | Finland         |
    Then I should see "There is a problem" error message displayed
    And I should see "Date of birth must be in the past" error summary