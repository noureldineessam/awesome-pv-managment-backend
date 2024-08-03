
import { gql } from 'graphql-tag';


// Create User
export const CREATE_USER_MUTATION = gql`
  mutation createUser($user: UserCreateInput!) {
    createUser(user: $user) {
      _id
      name
      email
    }
  }
`;

// Update User
export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($_id: ID!, $user: UserUpdateInput!) {
    updateUser(_id: $_id, user: $user) {
      name
      _id
    }
  }
`;

// Delete User
export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;

// Login User
export const LOGIN_USER_MUTATION = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

// Create Report
export const CREATE_REPORT_MUTATION = gql`
  mutation createReport($report: ReportCreateInput!, $facilityId: ID!) {
    createReport(report: $report, facilityId: $facilityId) {
      _id
      title
      description
    }
  }
`;

// Delete Report
export const DELETE_REPORT_MUTATION = gql`
  mutation deleteReport($_id: ID!, $facilityId: ID!) {
    deleteReport(_id: $_id, facilityId: $facilityId)
  }
`;

// Create Facility
export const CREATE_FACILITY_MUTATION = gql`
  mutation createFacility($facility: FacilityCreateInput!) {
    createFacility(facility: $facility) {
      _id
      name
    }
  }
`;

// Update Facility
export const UPDATE_FACILITY_MUTATION = gql`
  mutation updateFacility($_id: ID!, $facility: FacilityUpdateInput!) {
    updateFacility(_id: $_id, facility: $facility) {
      _id
      name
      nominialPower
    }
  }
`;

// Delete Facility
export const DELETE_FACILITY_MUTATION = gql`
  mutation deleteFacility($_id: ID!) {
    deleteFacility(_id: $_id)
  }
`;