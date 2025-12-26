# Splitwise Calculator

This is a React-based Splitwise Calculator that simply calculates the total cost for each person in a group order, including tax and delivery charges. It is designed to be easy to use and provides a breakdown of the costs.

## Features

- **Dynamic Rows**: Add or remove rows based on the number of people.
- **Tax Calculation**: Automatically calculates 5% and 16% tax for each item.
- **Delivery Split**: Equitably splits delivery charges among all participants.
- **Real-time Updates**: Costs are recalculated instantly as you type.

## Tech Stack

- **React 19**: The latest version of React for building the UI.
- **Vite**: A fast build tool and development server.
- **MUI (Material UI)**: A popular React component library for styling.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd splitwise-calculator
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`.

### Building for Production

To build the app for production:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Contributing

Contributions are welcome! If you find a bug or want to suggest a feature, please open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
