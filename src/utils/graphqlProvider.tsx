import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://cms.awfulworld.space/graphql",
  cache: new InMemoryCache(),
});

interface IGraphQlProviderProps {
  children: React.ReactNode;
}

export default client;
