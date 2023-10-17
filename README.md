## Requisiti:

- Node: per installare https://nodejs.org/it

- Angular CLI : `npm install -g @angular/cli`

- [JSON Server](https://github.com/typicode/json-server) `npm install -g json-server` (opzionale. Serve per far partire il server di back-end in locale). L'applicazione parte comunque solo che mostrerà il contatore dei prodotti a 0 e non potrà fare insert e update.

## Installare dipendenze

Lanciare comando `npm install`

## Development server

Lanciare comando `npm run start` per far partire l'applicazione in locale. L'applicazione parità all'indirizzo `http://localhost:4200/`

## Back-end

L'applicazione utilizza [JSON Server](https://github.com/typicode/json-server) come API di back-end. Lanciare comando `npm run server` su un nuovo terminale. Questo comando farà partire le API di back-end all'indirizzo `http://localhost:5000/`