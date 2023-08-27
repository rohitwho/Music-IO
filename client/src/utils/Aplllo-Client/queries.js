


import {  gql } from '@apollo/client';



export const GET_MESSAGES = gql`
query User {
  user {
    _id
    username
    messages {
      messageContent
      createdAt
      _id
    }
  }
}




` 
export const GET_COMMENTS = gql`

query User {
  user {
    comments {
      commentText
      commentAuthor
    }
  }
}



`
export  const GET_USER = gql`
query User {
  user {
    username
    email
    description
    _id
    friends {
      _id
    }
   
  }
}


`
export const FRIENDS = gql`

query User {
  user {
    username
    email
    description
    _id
  
    friends {
      _id
      username
      messages {
        messageContent
        createdAt
      }
    }
  }
}



`





