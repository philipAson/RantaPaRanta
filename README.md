# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Get Started med RantaPaRanta

After cloning repo run following in terminal:
    npm install
    npm run dev 

Then remove these lines from package.json:
    "homepage": "https://philipason.github.io/ranta-pa-ranta",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"

And run:
    npm uninstall gh-pages
in terminal.

# CMS implementations

    * Replace font API's in App.css to the ones that is used in your project.

    * Some modifications to both index.css and App.css may be needed.

# Styles

Main bg blue: #0e1833
Alt bg beige: #f6ebe4
Button blue: #152450
Header font: 
    bebas-neue-pro, sans-serif;
    font-weight: 400
    color: #fff;

Figures font:
    bebas-neue-pro, sans-serif;
    font-weight: 200
    color: #fff;

Text above figures:
    Raleway, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    font-size: 12px;

Text font: 
    font-family: Raleway, sans-serif;
    line-height: 1.68;
    font-size: 18