export const ConstantsLib = {
  FULL_NAME: 'HOF TEST',
  DOB_1978: '01/01/1978',
  DOB_11_11_1988: '11/11/1988',
  COUNTRY_OF_NATIONALITY: 'PANAMA',
  TELEPHONE: '01616699548',
  AGENT_EMAIL: 'Agents.TestEmail@digital.homeoffice.gov.uk',
  CONTACT_TELEPHONE: '01616699548',
  ADDRESS_LINE_1: '100',
  ADDRESS_LINE_2: 'Tenth St',
  TOWN_OR_CITY: 'HULL',
  COUNTY: 'Surrey',
  POSTCODE: 'M11 1HH',
  COMPANY_NAME: 'Test UK Ltd',
  RESPONSE_YES: 'Yes',
  RESPONSE_NO: 'No',
  SAS_HOF_EMAIL: requiredEnv('SAS_HOF_EMAIL')
} as const;


function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}