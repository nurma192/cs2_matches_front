import React from "react"
import {createRoot} from "react-dom/client"
import App from "./App"
import "./index.css"
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider} from "./components/vim-provider";
import { Provider } from "react-redux";
import {store} from "./store/store"


const container = document.getElementById("root")

if (container) {
    const root = createRoot(container)

    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <NextUIProvider>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </NextUIProvider>
            </Provider>
        </React.StrictMode>,
    )
} else {
    throw new Error(
        "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
    )
}
