/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const me = `query Me {
  me {
    firstName
    lastName
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    firstName
    lastName
    phoneModel
    age
    employmentStatus
    postalCode
    rate
    owner
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      firstName
      lastName
      phoneModel
      age
      employmentStatus
      postalCode
      rate
      owner
    }
    nextToken
  }
}
`;
