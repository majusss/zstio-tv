import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cms.awfulworld.space/graphql",
  cache: new InMemoryCache(),
});

export default client;
