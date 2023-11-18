import { cleanup, render } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

// TODO: If global context providers are needed, include them in the wrapper function.
// Example wrapper with context provider
// const AllTheProviders = ({ children }) => {
//   return (
//     <MyContextProvider>
//       {children}
//     </MyContextProvider>
//   );
// };

// Then use it in the customRender function
// function customRender(ui, { ...options }) {
//   return render(ui, { wrapper: AllTheProviders, ...options });
// }

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
