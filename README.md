<p align="center">
 <img width="200" src="images/logo.png"/>
 <h1 align="center">Vue Map 🚀</h1>
 
</p>


### <h3 align="center"> Vue 3 Exquisite Buildings Locator web app 🚀 </h3>
<hr />


## Tools 🛠

Vue 3, Composition API, Typescript, Google Map (with custom wrapper), Vue/test-utils

## Features 🔥

- View start point shows a dropdown with a placeholder of the select user. 
- On selecting user, it shows loader in building list container while fetching data.
- Shows each user building list in a container after the dropdown list.
- It select first building from the selected user as default. And Shows loader on MapView Container until map is fully loaded.  It shows MapView of that building with Marker (on Hover of marker should display Building name and Country name in a tooltip).
- Users can select any building from the list to see the MapView of that building. done
- Users can create, update and delete current selected user buildings list.
- On Click of Add Button /Edit icon of building the MapView removes from the DOM and Show Add/Edit Form container.
- In Add/Edit Form for Location drop down shows the Countries list from [countriesList.json](/countriesList.json).
- After Add/Edit successfully, select the updated Building and shows the MapView of that building.

## Acceptance Criteria



## UI





## Getting Started

> Clone the repository and install all dependencies

```bash
yarn install
```

Then, run the development server:

```bash
cd vue-maps
# and
yarn run serve
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.



