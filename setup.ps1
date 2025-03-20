# Script PowerShell per creare la struttura di cartelle per jaiki-react-template
# Esegui questo script nella directory principale del progetto

# Funzione per creare una directory se non esiste
function Create-DirectoryIfNotExists {
    param (
        [string]$Path
    )
    
    if (-not (Test-Path -Path $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
        Write-Host "Creata cartella: $Path" -ForegroundColor Green
    }
}

# Funzione per creare un file con contenuto
function Create-File {
    param (
        [string]$Path,
        [string]$Content = ""
    )
    
    $Directory = Split-Path -Path $Path
    Create-DirectoryIfNotExists -Path $Directory
    
    if (-not (Test-Path -Path $Path)) {
        New-Item -ItemType File -Path $Path -Force | Out-Null
        if ($Content -ne "") {
            Set-Content -Path $Path -Value $Content
        }
        Write-Host "Creato file: $Path" -ForegroundColor Cyan
    }
}

# Funzione per creare un file .gitkeep in una directory vuota
function Create-GitKeep {
    param (
        [string]$Path
    )
    
    Create-DirectoryIfNotExists -Path $Path
    Create-File -Path "$Path\.gitkeep"
}

# Directory principale
$SrcDir = "src"
Create-DirectoryIfNotExists -Path $SrcDir

# Struttura principale
$Directories = @(
    "$SrcDir\assets",
    "$SrcDir\components",
    "$SrcDir\components\ui",
    "$SrcDir\components\layout",
    "$SrcDir\components\features",
    "$SrcDir\context",
    "$SrcDir\hooks",
    "$SrcDir\pages",
    "$SrcDir\services",
    "$SrcDir\styles",
    "$SrcDir\utils",
    "$SrcDir\lib"
)

foreach ($Dir in $Directories) {
    Create-GitKeep -Path $Dir
}

# File principali
Create-File -Path "$SrcDir\App.jsx" -Content "import React from 'react';

function App() {
  return (
    <div>
      {/* App content goes here */}
    </div>
  );
}

export default App;"

Create-File -Path "$SrcDir\main.jsx" -Content "import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);"

Create-File -Path "$SrcDir\index.css" -Content "@import 'tailwindcss';"

# Componenti di esempio
Create-File -Path "$SrcDir\components\layout\Layout.jsx" -Content "import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <main>{children}</main>
      {/* Footer */}
    </div>
  );
};

export default Layout;"

Create-File -Path "$SrcDir\components\ui\Button.jsx" -Content "import React from 'react';

const Button = ({ children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default Button;"

# Pagine
Create-File -Path "$SrcDir\pages\Home.jsx" -Content "import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;"

Create-File -Path "$SrcDir\pages\NotFound.jsx" -Content "import React from 'react';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFound;"

# Hooks
Create-File -Path "$SrcDir\hooks\useLocalStorage.js" -Content "import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Hook implementation
};

export default useLocalStorage;"

# Utility
Create-File -Path "$SrcDir\utils\helpers.js" -Content "// Funzioni di utility"

# File di configurazione
Create-File -Path "tailwind.config.js" -Content "/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}"

Create-File -Path "postcss.config.js" -Content "export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}"

Write-Host "`nStruttura del progetto creata con successo!" -ForegroundColor Yellow
Write-Host "Esegui 'npm install' per installare le dipendenze, quindi 'npm run dev' per avviare il server di sviluppo." -ForegroundColor Yellow