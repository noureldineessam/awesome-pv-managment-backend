
import { gql } from 'graphql-tag';

export const GET_USER_QUERY = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      email
      name
    }
  }
`;

// List All Facilities for User
export const USER_FACILITIES_QUERY = gql`
  query userFacilities {
    userFacilities {
      _id
      name
    }
  }
`;

// Get Report by ID
export const GET_REPORT_QUERY = gql`
  query report($_id: ID!) {
    report(_id: $_id) {
      _id
      title
      description
    }
  }
`;

// List All Reports for a Facility
export const FACILITY_REPORTS_QUERY = gql`
  query facilityReports($facilityId: ID!) {
    facilityReports(facilityId: $facilityId) {
      _id
      title
      description
    }
  }
`;

// Get Facility by ID
export const GET_FACILITY_QUERY = gql`
  query facility($_id: ID!) {
    facility(_id: $_id) {
      _id
      name
    }
  }
`;