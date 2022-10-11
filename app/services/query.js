import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS_QUERY = gql`
  query {
    products {
      items {
        name
        slug
        assets {
          source
        }
        variants {
          price
        }
      }
    }
  }
`;

export const GET_PRODUCTS_QUERY = gql`
  query ($ids: ID, $value: SearchResultSortParameter) {
    search(input: {groupByProduct: true, collectionId: $ids, sort: $value}) {
      items {
        slug
        productName
        productAsset {
          preview
        }
        price {
          ... on PriceRange {
            min
          }
        }
      }
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation Add_Item($id: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $id, quantity: $quantity) {
      ... on OrderModificationError {
        errorCode
        message
      }
      ... on OrderLimitError {
        errorCode
        message
      }
    }
  }
`;

export const GET_PRODUCT_DETAIL_QUERY = gql`
  query ($slug: String) {
    product(slug: $slug) {
      name
      variantList {
        items {
          id
          name
          sku
          price
          stockLevel
        }
      }
      description
      featuredAsset {
        source
      }
    }
  }
`;

export const GET_CURRENT_USER_QUERY = gql`
  query {
    activeCustomer {
      firstName
      lastName
      phoneNumber
      emailAddress
      addresses {
        id
        fullName
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
          name
          code
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
      }
      orders {
        items {
          id
          state
          totalQuantity
        }
        totalItems
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation (
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phoneNumber: String
  ) {
    registerCustomerAccount(
      input: {
        emailAddress: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        phoneNumber: $phoneNumber
      }
    ) {
      ... on Success {
        success
      }
      ... on MissingPasswordError {
        errorCode
        message
      }
      ... on PasswordValidationError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      ... on CurrentUser {
        id
        identifier
      }
      ... on InvalidCredentialsError {
        errorCode
        message
      }
      ... on NotVerifiedError {
        errorCode
        message
      }
      ... on NativeAuthStrategyError {
        errorCode
        message
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation LOGOUT {
    logout {
      success
    }
  }
`;

export const GET_CART_ITEM_QUERY = gql`
  query GET_CART_ITEM($id: ID!) {
    order(id: $id) {
      totalQuantity
      subTotal
      lines {
        id
        productVariant {
          name
        }
        featuredAsset {
          source
        }
        quantity
        unitPrice
        linePrice
      }
    }
  }
`;

export const UPDATE_CART_LINE_MUTATION = gql`
  mutation ADJUST_LINE($id: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $id, quantity: $quantity) {
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`;

export const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UPDATE_CUSTOMER(
    $firstName: String
    $lastName: String
    $phoneNumber: String
  ) {
    updateCustomer(
      input: {
        firstName: $firstName
        lastName: $lastName
        phoneNumber: $phoneNumber
      }
    ) {
      id
    }
  }
`;

export const DELETE_ADDRESS_MUTATION = gql`
  mutation ($id: ID!) {
    deleteCustomerAddress(id: $id) {
      success
    }
  }
`;

export const ADD_ADDRESS_MUTATION = gql`
  mutation (
    $fullName: String
    $streetLine1: String!
    $streetLine2: String
    $city: String
    $province: String
    $postalCode: String
    $countryCode: String!
    $phoneNumber: String
    $shipping: Boolean
    $billing: Boolean
  ) {
    createCustomerAddress(
      input: {
        fullName: $fullName
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        province: $province
        postalCode: $postalCode
        countryCode: $countryCode
        phoneNumber: $phoneNumber
        defaultShippingAddress: $shipping
        defaultBillingAddress: $billing
      }
    ) {
      id
      defaultShippingAddress
      defaultBillingAddress
    }
  }
`;

export const UPDATE_ADDRESS_MUTATION = gql`
  mutation (
    $id: ID!
    $fullName: String
    $streetLine1: String
    $streetLine2: String
    $city: String
    $province: String
    $postalCode: String
    $countryCode: String
    $phoneNumber: String
    $shipping: Boolean
    $billing: Boolean
  ) {
    updateCustomerAddress(
      input: {
        id: $id
        fullName: $fullName
        streetLine1: $streetLine1
        streetLine2: $streetLine2
        city: $city
        province: $province
        postalCode: $postalCode
        countryCode: $countryCode
        phoneNumber: $phoneNumber
        defaultShippingAddress: $shipping
        defaultBillingAddress: $billing
      }
    ) {
      streetLine1
    }
  }
`;
