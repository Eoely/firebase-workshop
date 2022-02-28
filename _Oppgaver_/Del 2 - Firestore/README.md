# Oppgaver Del 2 - Firestore

Vi skal nå begynne å få vår web-applikasjon til å snakke med vår helt egen database i Firestore.

## Sett opp Firebase config

Det første vi skal jeg gjøre er å fylle ut `firebaseConfig` i filen `firebase.js`. Dette trenger vi for å kunne kommunisere med firestore. 

### Lag database

Før du kan koble til firestore og legge til dokumenter må vi gi Google beskjed om å opprette en database i Firestore Database for oss. Gå til Firebase-konsollen, velg Firestore Database i sidemenyen og opprett en database. Velg "Test mode" og f.eks en lokasjon i Europa.

### Last ned verktøyene som hører til firestore i CLI-en.

Kjør en ny firebase init i prosjektmappen din, og denne gangen velger du: <br />

<code>Firestore: Configure security rules and indexes files for Firestore</code>

Velg default-verdiene som dukker opp ved å trykke Enter til du får 

<code> ✔Firebase initialization complete! </code>

### Legg til firebaseConfig i firebase.js
Siste oppsett er å hente ut config fra firebasekonsollen.

Gå til Project Settings i [Firebase Console](https://console.firebase.google.com). 

Klikk "Add Web App" under `Your Apps` nederst 

Gi appen et kult navn, for eksempel Quiz Game 2000 🧠 

Huk av på "also setup hosting.." og velg den du satte opp tidligere.

Kopier `firebaseConfig` objektet i til utklippstavla og sett det inn der det hører hjemme i `firebase.js`.

Nå er appen din klar til å kobles til firestore! 🎉

💡 Husk å legge til firestore i deploy-scriptet:

<code>firebase deploy --only hosting,firestore</code> 


## Legg til et dokument

Første oppgave blir å legge til et nytt spørsmål i din Firestore database fra koden.

En bruker skal altså kunne skrive inn et spørsmål og svar på nettsiden, og så skal dette bli lagt inn i databasen.

Se til at spørsmålet du legger inn dukker opp i din Firestore collection.

![Legg til spørsmål](/resources/createQuestion.png)

## Hent et dokument fra databasen

Når du går inn på url'en ( http://localhost:3000/question/{id} ) med id tilsvarende det spørsmålet du nettopp la til i Firestore-databasen, så skal dette spørsmål bli fylt ut i input-feltene.

![Legg til spørsmål](/resources/editQuestion.png)

## Endre et dokument fra databasen

Legg til mulighet for å kunne endre på et eksisterende spørsmål i databasen. Dersom du går inn på et spørsmål som allerede finnes og gjør en endring og lagrer dette. Så skal feltene i databasen tilhørende dette dokumentet oppdatere seg.

## Slett et dokument fra databasen

Lag funksjonalitet for å slette et spørsmål fra databasen.

## Hent mange dokumenter fra databasen

Fram til nå har vi forholdt oss til et og et spørsmål, men nå ønsker vi å gjøre slik at du kan liste opp alle de spørsmålene som du har lagt inn.

![Legg til spørsmål](/resources/getQuestions.png)

## Lag en Quiz

Lag en quiz med et utvalg av spørsmålene fra databasen. Foreløpig vil denne quizen kun bestå av dine spørsmål, men i neste del av workshopen skal vi koble på autentisering, og da vil vi få mulighet til å generere en quiz med spørsmål som også er lagt inn av andre brukere.

Du kan jo f.eks la brukeren som skal generere en quiz få mulighet til å velge hvor mange spørsmål hen vil ha listet opp?

## Ekstraoppgaver

- Sett opp henting av dokumenter med real-time oppdatering.
- Legg til tidspunkt for når dokumentet ble laget og når det ble oppdatert.
- Legg til flere felt per spørsmåls-dokument. F.eks kategori.
- Sett en custom id til et spørsmåls-dokument.
- Hent ut kun de spørsmål som er laget etter et gitt tidspunkt.
