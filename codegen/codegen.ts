import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  documents: 'codegen/**/*.graphql',
  generates: {
    "graphql/__generated__/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        reactQueryVersion: "auto",
        exposeQueryKeys: true,
        exposeFetcher: true,
        fetcher: {
          func: "@/codegen/fetcher#useFetchGraphQLData",
          isReactHook: true,
        },
      },
    },
  },
};

export default config;
