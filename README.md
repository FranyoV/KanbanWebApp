# KanbanWebApp

## A projekt leírása:

A projekt egy ASP.NET Core keretrendszeren belül megvalósított, SQL adatbázisra épülő böngészőben (https://localhost:3000/ cím alatt) megjelenő webalkalmazás.
Segítségével rendszerezhetjük a teendőinket négy különböző státusz szerint: To do, Ongoing, Blocked, Done. 
Az előbb említett státusz változtatható, azaz az oszlopok közötti mozgatás megvalósítható. A prioritást a teendők sorrendje határozza meg, 
tehát az előbbi adataik mellett még az egymáshoz viszonyított sorrendet is tároljuk és megjelenítjük. 


## Kanban tábla:

A teendők rendelkeznek címmel, leírással, határidővel és állapottal (todo, ongoing, blocked, done). 
Minden teendő fejlécében 4 gomb található, amellyel a teendők tulajdonságait tudjuk módosítani. A négy gomb a következő:

<ins>Törlés:</ins> A törlés megvalósításához kell megnyomni a kuka ikonnal ellátott gombot.

<ins>Szerkesztés:</ins> A ceruza ikonnal ellátott gomb megnyomásával a teendő cím, leírás, státusz és határidő tulajdonságának szerkesztéséhez használható funkció.

<ins>Oszlopon belüli fel-le mozgatás:</ins> A teendők megjelenítésének és tárolásának sorrendjét a felfelé és lefelé mutató nyilakkal ellátott gombok használatával 
tudjuk végbe vinni. 

Oszlopokba a teendők státuszaik szerint a vannak sorolva. Minden oszlophoz az annak a tetején lévő plusz ikonnal ellátott gomb segítségével tudunk új 
teendőt felvenni.
Ekkor megadhatjuk az új teendő tulajdonságait. Az új teendő automatikusan a oszlop végére kerül.


## Szerkezeti felépítése:

### Frontend:

React alapú, böngészőben megjelenő user interface.

<ins>App.js:</ins> betölti az adatokat a backendről és áttadja azokat a Board-nak.

<ins>Board.js:</ins> A tábla felépítésért felelős, tartalmazza a CRUD műveleteket és a hozzájuk tartozó API hívásokat. 
       Egy két dimenziós listában tárolt teendők adatait CardComponensekként jeleníti meg.
       
<ins>CardComponent.js:</ins> Egy teendő komponense.

<ins>ModalEditComponant.js:</ins> Egy teendő módosításáért felelős komponens.

<ins>ModalNewComponent.js:</ins> Egy teendő létrehozásáért felelős komponens.


### Backend:

SQL adatbázisra épülő ASP.NET Core keretrendszerrel valósul meg.

<ins>TodoItem.cs:</ins> Leírja, hogy milyen felépítése van egy Todo elemnek( azaz egy teendőknek).
-Id
-Title
-Description
-Priority
-Deadline
-Column

<ins>TodoContext.cs:</ins> Az osztály felelős az adatbázis és a TodoItemsController kommunikációjában.

<ins>TodoTemsController.cs:</ins> Az osztály kezeli az APi hívások fogadását és kezelését.

<ins>Program.cs:</ins> felállítja és konfigurálja az adatbázist

Végpontok:

GET: api/TodoItems: Visszaadja az összes teendőt, prioritás szerinti növekvő sorrendben.
GET: api/TodoItems/{id}: Visszad az adott id-hez tartozó teendőt az adatbázisból.
PUT: api/TodoItems/{id}: Módosítást végez az adott id-hez tartozó Todo elemen.
PUT: api/TodoItems/Columns/{id}: Az adott id-hoz tartozó oszlop összes elemét frissíti.
POST: api/TodoItems: Hozzáad egy új teendőt az adatbázishoz.
DELETE: api/TodoItems/{id}: Törli a megadott id-hez tartozó teendőt az adatbázisból.

A végpontok a https://localhost:7059/ -on keresztül (például Postman ingyenes alkalmazás segítségével) tesztelhetőek.


### Inicializáslás és használat:

A program felállításhoz szükség van az npm install parancs egyszeri futtatására a program mappájának megfelelő termináljában. 
Majd a solution-ön egy jobb klikk segítségével megnyitjuk a "Set Startup Projects" opciót,  bepipáljuk a 'Multiple startup projects' lehetőséget 
és beállítjuk a projectek sorrendjét KanbanBackend, Kanban -ra, mindkettő actionjéhez a "Start" opciót választjuk. 

További használt package-ek:
-axios (npm install axios)

-react-bootstrap (npm install react-bootstrap bootstrap)

-bootstrap (npm install bootstrap)

-fontawesome (npm install --save @fortawesome/free-solid-svg-icons, npm install --save @fortawesome/react-fontawesome)

A fent említett packageket a projekthez adhatjuk parancssorból vagy akár a solution alatt található "npm install" funkció segítségével.

#### Használt segéletek:
-Stackoverflow

-Az backend alapjának legenerálásához használt útmutató a megtalálható a docs.microsoft.com-on "Create ans ASP.NET Core app with React in Visual Studio' név alatt.
