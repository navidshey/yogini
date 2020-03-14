export {};

// interface Errors {
//   noprofile: string;
//   name: string;
//   email: string;
//   password: string;
//   password2: string;
// }

declare global {
  interface window {
    REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}
