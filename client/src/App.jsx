
import Navbar from "./Components/Navbar/Navbar";
import Chatbox from "./Components/chatbox/chatbox";
import Footer from "./Components/Footer/footer";
import SpotifyPlayer from "./Components/spotify/spotify";
import { setContext } from "@apollo/client/link/context";
import { io } from "socket.io-client"; 
import Hero from "./Components/Hero/Hero"
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import Auth from "./utils/auth";
import {Routes, Route} from "react-router-dom"





const socket = io.connect("ws://localhost:3002")

const httpLink = createHttpLink({
  uri: "http://localhost:3002/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = Auth.getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


// console.log(code)
const code = new URLSearchParams(window.location.search).get("code");
function App() {
  const ChatboxAndSpotifyContainer = () => (
    <div    style={{
      display: "flex",
      justifyContent: "space-evenly",
    }}>
      <Chatbox socket={socket} />
      <SpotifyPlayer code={code} />
    </div>
  );
  return (
    <ApolloProvider client={client}>
      <>
      <Navbar />
      <Routes>
   
        <Route path="/" element={ <Hero/>}/>
          
       {Auth.loggedIn()?(<Route path="/chatbox" element={<ChatboxAndSpotifyContainer />} />  ):(  <Route path="/" element={ <Hero/>}/>)}
      
          
          


        </Routes>
        <Footer />
      </>
      
    </ApolloProvider>
  )
}

export default App;
