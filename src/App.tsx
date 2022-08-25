import { Suspense } from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainContainer from "./components/main_container";

import { CollectionProvider } from "./components/collections/CollectionContext";

import { client } from "./graphql/setup";
import { routes, RouteType } from "./routes";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <CollectionProvider>
          <MainContainer>
            <Suspense fallback={<></>}>
              <Routes>
                {routes.map((r: RouteType, index: number) => (
                  <Route element={r.component} path={r.url} key={index} />
                ))}
              </Routes>
            </Suspense>
          </MainContainer>
        </CollectionProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
