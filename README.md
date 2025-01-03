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

---

## Installatie
1. **Clone de repository**:
    ```bash
    git clone https://github.com/XanderWTRS/BackendWeb-Node.js
    ```

2. **Navigeer naar de projectmap**:
    ```bash
    cd Project-Node.js
    ```

3. **Installeer de benodigde dependencies**:
    ```bash
    npm install
    ```

4. **Maak een `.env`-bestand** aan in de rootmap van het project OF pas het .env.example aan:
<img width="584" alt="image" src="https://github.com/user-attachments/assets/8664d266-8c53-426d-954f-52aa3737de51" />


5. **Zorg ervoor dat de database bestaat en in MySQL is**:

6. **Voer migraties uit** om de tabellen te maken:
    ```bash
    npx knex migrate:latest
    ```

7. **Seed de database**:
    ```bash
    npx knex seed:run
    ```

8. **Start de server**:
    ```bash
    node app.js
    ```

De server draait standaard op [http://localhost:4000](http://localhost:4000).

---

## Hoe te gebruiken
1. **Gebruik een API-client zoals Postman** of een browser om de API te testen.
2. Bekijk de beschikbare endpoints in de [API Documentatie](./documentatie.html).

---

## Seeders Gebruiken
De seeders voegen testgegevens toe aan de database. Zorg dat je deze uitvoert in de juiste volgorde:

1. **Voer alle seeders uit via Knex**:
    ```bash
    npx knex seed:run
    ```

Knex zorgt ervoor dat:
- Gebruikers worden toegevoegd aan de `users`-tabel.
<img width="569" alt="image" src="https://github.com/user-attachments/assets/326c46d8-846a-4e00-814b-946ba0f5374f" />


- Taken gekoppeld aan gebruikers worden toegevoegd aan de `tasks`-tabel.
<img width="694" alt="image" src="https://github.com/user-attachments/assets/e6fe9964-53ce-4682-9a3d-1eea1d524e33" />


2. **Controleer de database**:
   Verifieer of de testgegevens correct zijn toegevoegd.

---

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

---

## API Endpoints
Zie de volledige documentatie in [documentatie.html](./documentatie.html).

### Voorbeelden
- **POST /api/users**: Maak een nieuwe gebruiker aan.
- **GET /api/tasks/search?title=test**: Zoek taken op titel.

---

## Validatie
De API implementeert strikte validatie:
- **Gebruikers**: Namen mogen geen cijfers bevatten; wachtwoorden moeten sterk zijn.
- **Taken**: Titel is verplicht; start- en einddatums moeten logisch zijn.

---

## Gebruikte Bronnen:
- [Knex.js](https://knexjs.org/)
- [Node.js](https://nodejs.org/)
- [MySQL-documentatie](https://dev.mysql.com/doc/)
- EHB Canvas: [Backend Web - Node.js](https://canvas.ehb.be/courses/40595)
- Hoe connecteer je mySQL met node.js en express? https://www.youtube.com/watch?v=W8jySpfRUDY
---

## Licentie
Dit project is beschikbaar onder de MIT-licentie.
