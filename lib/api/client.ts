import { Account, Client, TablesDB, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const tablesDB = new TablesDB(client);

export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
export const settingsTableDBId =
  process.env.NEXT_PUBLIC_APPWRITE_SETTINGS_TABLE_DB_ID!;

export { ID };
export { client };
