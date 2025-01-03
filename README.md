# Task Management API

Welkom bij de **Task Management API**! Dit project is ontworpen om gebruikers en taken te beheren met diverse endpoints. Het bevat functionaliteiten zoals gebruikersauthenticatie, validatie, paginering en zoekmogelijkheden. Hieronder vind je gedetailleerde instructies om aan de slag te gaan.

![VScode](https://img.shields.io/badge/VScode-v1.96.2-blue?style=for-the-badge&logo=visual-studio-code&logoColor=white&labelColor=000000)
![Node.js](https://img.shields.io/badge/Node.js-v20.18.1-green?style=for-the-badge&logo=node.js&logoColor=white&labelColor=000000)
![MySQL](https://img.shields.io/badge/MySQL-v8.0.40-yellow?style=for-the-badge&logo=MySQL&logoColor=white&labelColor=000000)

## Inhoud
- [Installatie](#installatie)
- [Hoe te gebruiken](#hoe-te-gebruiken)
- [Seeders Gebruiken](#seeders-gebruiken)
- [Belangrijke Functionaliteiten](#belangrijke-functionaliteiten)
- [API Endpoints](#api-endpoints)
- [Validatie](#validatie)

## Installatie
1. Clone de repository:
    ```bash
    git clone https://github.com/XanderWTRS/BackendWeb-Node.js
    ```
2. Navigeer naar de projectmap:
    ```bash
    cd project-node.js
    ```
3. Installeer de benodigde dependencies:
    ```bash
    npm install
    ```
4. Maak een `.env` bestand aan en voeg de volgende variabelen toe:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=<je-wachtwoord>
    DB_NAME=backendweb_nodejs
    PORT=4000
    ```
5. Start de server:
    ```bash
    node app.js
    ```

## Hoe te gebruiken
1. Start de server via `node app.js`. De API is standaard beschikbaar op `http://localhost:4000`.
2. Gebruik een tool zoals [Postman](https://www.postman.com/) of een browser om endpoints te testen.
3. Raadpleeg de [API Documentatie](./documentatie.html) voor een volledige lijst van endpoints.

## Seeders Gebruiken
De seeders vullen je database met testgegevens. Volg deze stappen om ze uit te voeren:

1. Zorg dat je database is ingesteld en leeg is.
2. Voer de seeders uit:
    - **Gebruikers**:
        ```bash
        node seeders/userSeeder.js
        ```
        <img width="672" alt="image" src="https://github.com/user-attachments/assets/86b2809f-b4ba-429d-9cac-efc9ecf59740" />

    - **Taken**:
        ```bash
        node seeders/taskSeeder.js
        ```
        <img width="559" alt="image" src="https://github.com/user-attachments/assets/6e85be51-deee-4047-84b6-6c08f80e8a99" />
3. Controleer je database om te zien of de gegevens succesvol zijn toegevoegd.
        <img width="609" alt="image" src="https://github.com/user-attachments/assets/1d1ff9dc-f908-4585-a761-77b41a5edabd" />

## Belangrijke Functionaliteiten
### 1. **Gebruikersbeheer**
   - CRUD-functionaliteiten voor gebruikers.
   - Validatie voor gebruikersgegevens.
   - Zoeken en filteren.
   - Paginering.

### 2. **Takenbeheer**
   - CRUD-functionaliteiten voor taken.
   - Statusupdates voor taken (open/completed).
   - Validatie en koppeling aan gebruikers.

### 3. **Authenticatie**
   - Login-functionaliteit met wachtwoordvalidatie.

### 4. **Zoeken en Paginering**
   - Zoek taken en gebruikers op basis van meerdere criteria.
   - Gebruik `limit` en `offset` om grote lijsten te beheren.

## API Endpoints
Zie de volledige documentatie in [documentatie.html](./documentatie.html).

### Voorbeelden
- **POST /api/users**: Maak een nieuwe gebruiker aan.
- **GET /api/tasks/search?title=test**: Zoek taken op titel.

## Validatie
De API implementeert strikte validatie:
- **Gebruikers**: Namen mogen geen cijfers bevatten; wachtwoorden moeten sterk zijn.
- **Taken**: Titel is verplicht; start- en einddatums moeten logisch zijn.

## Gebruikte Bronnen:
- Hoe connecteer je mySQL met node.js en express? https://www.youtube.com/watch?v=W8jySpfRUDY
- Algemeene kennis? https://canvas.ehb.be/courses/40595
- [Node.js en NPM](https://nodejs.org/)
- [MySQL-handleiding](https://dev.mysql.com/doc/)

## Licentie
Dit project is beschikbaar onder de MIT-licentie.
