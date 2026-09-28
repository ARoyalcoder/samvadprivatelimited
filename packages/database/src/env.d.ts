declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: string;
    DATABASE_URL?: string;
    [key: string]: string | undefined;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
  exit: (code?: number) => never;
};
