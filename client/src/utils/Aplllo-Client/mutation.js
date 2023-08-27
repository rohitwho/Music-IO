import  {gql} from "@apollo/client"

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
      email
      _id
    }
  }
}
`;

export const SIGN_UP = gql`
mutation signup($username: String!, $email: String!, $password: String!) {
  signup(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`



export const SEND_MESSAGE = gql`
mutation Mutation($input: Text) {
  addMessage(input: $input) {
    messages {
      messageContent

      createdAt
    }
    username
    email
  }
}


`;


export const POST_COMMENT = gql`

mutation Mutation($commentText: String, $commentAuthor: String) {
  addUserComment( commentText: $commentText, commentAuthor: $commentAuthor) {
    comments {
      commentAuthor
      commentText
    }
  }
}

`
export const UPDATE_USER_PROFILE = gql`
mutation updateUserProfile($input: updateProfile!) {
  updateUserProfile(input: $input) {
    _id
    email
    username
    description
  }
}
  `