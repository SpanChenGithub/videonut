// Declaring this interface provides type safety for message keys
type Messages = typeof import("@/locale/messages/en.json");
declare interface IntlMessages extends Messages {}

export {};
declare global {
  interface IPageProps {
    params?: Record<string, any>;
    searchParams?: { [key: string]: string | string[] | undefined };
  }
}
