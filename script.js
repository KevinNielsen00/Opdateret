class Vehicle {
  #model;
  #year;
  #miles;
  #color;
  #price;
  #picture;

  constructor(model, year, miles, color, price, picture) {
    this.#model = model;
    this.#year = year;
    this.#miles = miles;
    this.#color = color;
    this.#price = price;
    this.#picture = picture;
  }

  getModel() {
    return this.#model;
  }

  getYear() {
    return this.#year;
  }

  getMiles() {
    return this.#miles;
  }

  getColor() {
    return this.#color;
  }

  getPrice() {
    return this.#price;
  }

  getPicture() {
    return this.#picture;
  }
}

class Car extends Vehicle {
  constructor(model, year, miles, color, price, picture) {
    super(model, year, miles, color, price, picture);
  }
}

class Motorcycle extends Vehicle {
  constructor(model, year, miles, color, price, picture) {
    super(model, year, miles, color, price, picture);
  }
}

class Bike extends Vehicle {
  constructor(model, year, miles, color, price, picture) {
    super(model, year, miles, color, price, picture);
  }
}

const vehicles = [
  new Car("Ford", 1890, 940000, "White", 10000000, "https://weudealerimagesprd.blob.core.windows.net/dk3/news/kuga-hvid-designpakke-holdende.jpg"),
  new Car("BMW", 2020, 14000, "Blue", 400000, "https://fdm.dk/sites/default/files/2021-10/BMW_i4_M50-0002_1900.jpg"),
  new Car("Audi", 2021, 800, "White", 140000, "https://billeder.bilbasen.dk/bilinfo/831c0e1c-6dc4-48ce-8119-68106ad243f6.jpeg?class=S1600X1600https://billeder.bilbasen.dk/bilinfo/831c0e1c-6dc4-48ce-8119-68106ad243f6.jpeg?class=S1600X1600"),
  new Motorcycle("Harley-Davidson", 2015, 3000, "Black", 500000, "https://www.thunderbike.com/wp-content/uploads/2020/08/4k-2020-07-29-Black-BreakoutMichael-Rauscher222-1920x1280.jpg"),
  new Motorcycle("Honda", 2020, 200, "Red", 100000, "https://www.webbikeworld.com/wp-content/uploads/2021/01/2021-Honda-NC750X-Side-View.jpg"),
  new Bike("SX-ZITE", 2021, "none", "Black", 20000, "https://dyncdn.thg.dk/img/112646217_0_m_1078_1800.JPG"),
  new Bike("Giant", 2020, "none", "Green", 15000, "https://www.cycle-revolution.net/images/giant/my19-escape-3_color-b.jpg"),
];

//get the buttons to run the displayvehicles and only show one type
const showAllButton = document.querySelector("#showAllButton");
showAllButton.addEventListener("click", () => {
  displayVehicles(vehicles, 4);
});
//car button
const carButton = document.querySelector("#carButton");
carButton.addEventListener("click", () => {
  const filteredVehicles = vehicles.filter(vehicle => vehicle instanceof Car);
  displayVehicles(filteredVehicles, 4, "car");
});
//Motorcycle button
const motorcycleButton = document.querySelector("#motorcycleButton");
motorcycleButton.addEventListener("click", () => {
  const filteredVehicles = vehicles.filter(vehicle => vehicle instanceof Motorcycle);
  displayVehicles(filteredVehicles, 4, "motorcycle");
});
//Bike button
const bikeButton = document.querySelector("#bikeButton");
bikeButton.addEventListener("click", () => {
  const filteredVehicles = vehicles.filter(vehicle => vehicle instanceof Bike);
  displayVehicles(filteredVehicles, 4, "bike");
});

const carList = document.querySelector("#carList");
//the function generates the location of the car on the page and creates the html and places our elements into the html
function displayVehicles(vehicles, rowSize) {
  carList.innerHTML = ""; // Clear previous content
  for (let i = 0; i < vehicles.length; i += rowSize) { //make rows of cars and limit how many cars can be in a row by rowSize... (it iterates over the array and makes a new row when there are 4)
    const vehicleRow = document.createElement("div");
    vehicleRow.classList.add("vehicle-row");

    for (let j = i; j < i + rowSize && j < vehicles.length; j++) {//make a new div for each car and insert them where there is room (i.e. there are 3 cars in the first row, it can place one more and if there are 4, it uses a new div (car-row))
      const vehicle = vehicles[j];
      const vehicleElement = document.createElement("div");
      vehicleElement.classList.add("vehicle");
    
      const vehicleTitle = document.createElement("h2");
      vehicleTitle.textContent = `${vehicle.getYear()} ${vehicle.getModel()}`;
      vehicleElement.appendChild(vehicleTitle);
    
      const vehicleImage = document.createElement("img");
      vehicleImage.setAttribute("src", vehicle.getPicture());
      vehicleImage.setAttribute("alt", `${vehicle.getYear()} ${vehicle.getModel()}`);
      vehicleElement.appendChild(vehicleImage);
    
      const vehicleInfo = document.createElement("div");
      vehicleInfo.classList.add("vehicle-info");
      vehicleElement.appendChild(vehicleInfo);
    
      const vehicleDetails = document.createElement("ul");
      vehicleDetails.innerHTML = `
        <p>Color: ${vehicle.getColor()}</p>
        <p>Miles: ${vehicle.getMiles()}</p>
        <p>Price: ${vehicle.getPrice()} Kr.</p>
      `;
      vehicleInfo.appendChild(vehicleDetails);
    
      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-button");
      removeButton.textContent = "Remove";
      vehicleInfo.appendChild(removeButton);
    
      removeButton.addEventListener("click", () => {
        vehicles.splice(j, 1);
        displayVehicles(vehicles, rowSize);
      });
    
      vehicleRow.appendChild(vehicleElement);
    }

    carList.appendChild(vehicleRow);
  }
}

// Call the function with initial data
displayVehicles(vehicles, 4);

const vehicleForm = document.querySelector("#vehicleForm");
vehicleForm.addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault(); // prevent the default form submission

  // get form values
  const vehicleType = document.querySelector("#vehicleType").value;
  const model = document.querySelector("#model").value;
  const year = document.querySelector("#year").value;
  const miles = document.querySelector("#miles").value;
  const color = document.querySelector("#color").value;
  const price = document.querySelector("#price").value;
  const picture = document.querySelector("#picture").value;

  // create new vehicle object based on selected vehicle type
  let newVehicle;
  switch (vehicleType) {
    case "car":
      newVehicle = new Car(model, year, miles, color, price, picture);
      break;
    case "motorcycle":
      newVehicle = new Motorcycle(model, year, miles, color, price, picture);
      break;
    case "bike":
      newVehicle = new Bike(model, year, miles, color, price, picture);
      break;
    default:
      console.error("Invalid vehicle type");
      return;
  }

  // add new vehicle to array of vehicles
  vehicles.push(newVehicle);

  // display updated list of vehicles
  displayVehicles(vehicles, 4);

  // clear form
  vehicleForm.reset();
}
