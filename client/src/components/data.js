export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "home.svg",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Doctors",
        url: "/doctors",
        icon: "user.svg",
      },
      {
        id: 2,
        title: "Patients",
        url: "/patients",
        icon: "patients.svg",
      },
      {
        id: 3,
        title: "Appointments",
        url: "/appointments",
        icon: "appointment.svg",
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Blogs",
        url: "/blogs",
        icon: "post.svg",
      },
      {
        id: 2,
        title: "Messages",
        url: "/messages",
        icon: "note.svg",
      },
      {
        id: 4,
        title: "Admins",
        url: "/admins",
        icon: "admin.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "setting.svg",
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: "user.svg",
      },
    ],
  },
];

export const topDealUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    username: "Elva McDonald",
    email: "elva@gmail.com",
    amount: "3.668",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Linnie Nelson",
    email: "linnie@gmail.com",
    amount: "3.256",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Brent Reeves",
    email: "brent@gmail.com",
    amount: "2.998",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Adeline Watson",
    email: "adeline@gmail.com",
    amount: "2.512",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Juan Harrington",
    email: "juan@gmail.com",
    amount: "2.134",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Augusta McGee",
    email: "augusta@gmail.com",
    amount: "1.932",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Angel Thomas",
    email: "angel@gmail.com",
    amount: "1.560",
  },
];

export const chartBoxUser = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Total Users",
  number: "11.238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 400 },
    { name: "Fri", users: 500 },
    { name: "Sat", users: 450 },
  ],
};

export const chartBoxProduct = {
  color: "skyblue",
  icon: "/productIcon.svg",
  title: "Total Products",
  number: "238",
  dataKey: "products",
  percentage: 21,
  chartData: [
    { name: "Sun", products: 400 },
    { name: "Mon", products: 600 },
    { name: "Tue", products: 500 },
    { name: "Wed", products: 700 },
    { name: "Thu", products: 400 },
    { name: "Fri", products: 500 },
    { name: "Sat", products: 450 },
  ],
};
export const chartBoxRevenue = {
  color: "teal",
  icon: "/revenueIcon.svg",
  title: "Total Revenue",
  number: "$56.432",
  dataKey: "revenue",
  percentage: -12,
  chartData: [
    { name: "Sun", revenue: 400 },
    { name: "Mon", revenue: 600 },
    { name: "Tue", revenue: 500 },
    { name: "Wed", revenue: 700 },
    { name: "Thu", revenue: 400 },
    { name: "Fri", revenue: 500 },
    { name: "Sat", revenue: 450 },
  ],
};
export const chartBoxConversion = {
  color: "gold",
  icon: "/conversionIcon.svg",
  title: "Total Ratio",
  number: "2.6",
  dataKey: "ratio",
  percentage: 12,
  chartData: [
    { name: "Sun", ratio: 400 },
    { name: "Mon", ratio: 600 },
    { name: "Tue", ratio: 500 },
    { name: "Wed", ratio: 700 },
    { name: "Thu", ratio: 400 },
    { name: "Fri", ratio: 500 },
    { name: "Sat", ratio: 450 },
  ],
};

export const barChartBoxRevenue = {
  title: "Profit Earned",
  color: "#8884d8",
  dataKey: "profit",
  chartData: [
    {
      name: "Sun",
      profit: 4000,
    },
    {
      name: "Mon",
      profit: 3000,
    },
    {
      name: "Tue",
      profit: 2000,
    },
    {
      name: "Wed",
      profit: 2780,
    },
    {
      name: "Thu",
      profit: 1890,
    },
    {
      name: "Fri",
      profit: 2390,
    },
    {
      name: "Sat",
      profit: 3490,
    },
  ],
};

export const barChartBoxVisit = {
  title: "Total Visit",
  color: "#FF8042",
  dataKey: "visit",
  chartData: [
    {
      name: "Sun",
      visit: 4000,
    },
    {
      name: "Mon",
      visit: 3000,
    },
    {
      name: "Tue",
      visit: 2000,
    },
    {
      name: "Wed",
      visit: 2780,
    },
    {
      name: "Thu",
      visit: 1890,
    },
    {
      name: "Fri",
      visit: 2390,
    },
    {
      name: "Sat",
      visit: 3490,
    },
  ],
};

export const userRows = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    lastName: "Hubbard",
    firstName: "Eula",
    email: "kewez@@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Manning",
    firstName: "Stella",
    email: "comhuhmit@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Greer",
    firstName: "Mary",
    email: "ujudokon@hottmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Williamson",
    firstName: "Mildred",
    email: "tinhavabe@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Gross",
    firstName: "Jose",
    email: "gobtagbes@yahoo.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Sharp",
    firstName: "Jeremy",
    email: "vulca.eder@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Lowe",
    firstName: "Christina",
    email: "reso.bilic@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 8,
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Dean",
    firstName: "Garrett",
    email: "codaic@mail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 9,
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Parsons",
    firstName: "Leah",
    email: "uzozor@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 10,
    img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Reid",
    firstName: "Elnora",
    email: "tuhkabapu@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 11,
    img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Dunn",
    firstName: "Gertrude",
    email: "gibo@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
    verified: true,
  },
  {
    id: 12,
    img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Williams",
    firstName: "Mark",
    email: "tic.harvey@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 13,
    img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Cruz",
    firstName: "Charlotte",
    email: "ceuc@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 14,
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
    lastName: "Harper",
    firstName: "Sara",
    email: "bafuv@hotmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
  {
    id: 15,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    lastName: "Griffin",
    firstName: "Eric",
    email: "ubi@gmail.com",
    phone: "123 456 789",
    createdAt: "01.02.2023",
  },
];

export const products = [
  {
    id: 1,
    img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
    title: "Playstation 5 Digital Edition",
    color: "white",
    producer: "Sony",
    price: "$250.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 2,
    img: "https://www.pngmart.com/files/6/Dell-Laptop-PNG-Image.png",
    title: "Dell Laptop KR211822",
    color: "black",
    producer: "Dell",
    price: "$499.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 3,
    img: "http://images.samsung.com/is/image/samsung/uk-led-tv-hg40ed670ck-hg40ed670ckxxu-001-front",
    title: "Samsung TV 4K SmartTV",
    color: "gray",
    producer: "Samsung",
    price: "$999.49",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 4,
    img: "https://raylo.imgix.net/iphone-14-blue.png",
    title: "Apple Iphone 14 Pro Max",
    color: "white",
    producer: "Apple",
    price: "$799.49",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 5,
    img: "https://www.signify.com/b-dam/signify/en-aa/about/news/2020/20200903-movie-night-essentials-popcorn-ice-cream-and-the-new-philips-hue-play-gradient-lightstrip/packaging-lighstrip.png",
    title: "Philips Hue Play Gradient",
    color: "rainbow",
    producer: "Philips",
    price: "$39.99",
    createdAt: "01.02.2023",
  },
  {
    id: 6,
    img: "https://www.smartworld.it/wp-content/uploads/2019/09/High_Resolution_PNG-MX-Master-3-LEFT-GRAPHITE.png",
    title: "Logitech MX Master 3",
    color: "black",
    producer: "Logitech",
    price: "$59.49",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 7,
    img: "https://www.pngarts.com/files/7/Podcast-Mic-PNG-Picture.png",
    title: "Rode Podcast Microphone",
    color: "gray",
    producer: "Rode",
    price: "$119.49",
    createdAt: "01.02.2023",
  },
  {
    id: 8,
    img: "https://5.imimg.com/data5/SW/VM/MY-5774620/toshiba-split-ac-2-ton-3-star-rated-ras-24s3ks-500x500.png",
    title: "Toshiba Split AC 2",
    color: "white",
    producer: "Toshiba",
    price: "$899.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
  {
    id: 9,
    img: "https://img.productz.com/review_image/102489/preview_sony-kdl-50w800b-50-inch-hdtv-review-superb-picture-102489.png",
    title: "Sony Bravia KDL-47W805A",
    color: "black",
    producer: "Sony",
    price: "$970.49",
    createdAt: "01.02.2023",
  },
  {
    id: 10,
    img: "https://venturebeat.com/wp-content/uploads/2015/07/As_AO1-131_gray_nonglare_win10_03.png?fit=1338%2C1055&strip=all",
    title: "Acer Laptop 16 KL-4804",
    color: "black",
    producer: "Acer",
    price: "$599.99",
    createdAt: "01.02.2023",
    inStock: true,
  },
];

export const singleUser = {
  id: 1,
  title: "John Doe",
  img: "https://images.pexels.com/photos/17397364/pexels-photo-17397364.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
  info: {
    username: "Johndoe99",
    fullname: "John Doe",
    email: "johndoe@gmail.com",
    phone: "123 456 789",
    status: "verified",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "clicks", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        clicks: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        clicks: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        clicks: 3800,
      },
      {
        name: "Wed",
        visits: 2780,
        clicks: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        clicks: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        clicks: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        clicks: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe purchased Playstation 5 Digital Edition",
      time: "3 day ago",
    },
    {
      text: "John Doe added 3 items into their wishlist",
      time: "1 week ago",
    },
    {
      text: "John Doe purchased Sony Bravia KD-32w800",
      time: "2 weeks ago",
    },
    {
      text: "John Doe reviewed a product",
      time: "1 month ago",
    },
    {
      text: "John Doe added 1 items into their wishlist",
      time: "1 month ago",
    },
    {
      text: "John Doe reviewed a product",
      time: "2 months ago",
    },
  ],
};
export const singleProduct = {
  id: 1,
  title: "Playstation 5 Digital Edition",
  img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
  info: {
    productId: "Ps5SDF1156d",
    color: "white",
    price: "$250.99",
    producer: "Sony",
    export: "Japan",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "orders", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        orders: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        orders: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        orders: 3800,
      },
      {
        name: "Wed",
        visits: 2780,
        orders: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        orders: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        orders: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        orders: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe purchased Playstation 5 Digital Edition",
      time: "3 day ago",
    },
    {
      text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 week ago",
    },
    {
      text: "Mike Doe purchased Playstation 5 Digital Edition",
      time: "2 weeks ago",
    },
    {
      text: "Anna Doe reviewed the product",
      time: "1 month ago",
    },
    {
      text: "Michael Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 month ago",
    },
    {
      text: "Helen Doe reviewed the product",
      time: "2 months ago",
    },
  ],
};

export const councils = [
  { id: 1, name: "Andhra Pradesh Medical Council" },
  { id: 2, name: "Arunachal Pradesh Medical Council" },
  { id: 3, name: "Assam Medical Council" },
  { id: 28, name: "Bhopal Medical Council" },
  { id: 4, name: "Bihar Medical Council" },
  { id: 29, name: "Bombay Medical Council" },
  { id: 30, name: "Chandigarh Medical Council" },
  { id: 5, name: "Chattisgarh Medical Council" },
  { id: 6, name: "Delhi Medical Council" },
  { id: 7, name: "Goa Medical Council" },
  { id: 8, name: "Gujarat Medical Council" },
  { id: 9, name: "Haryana Medical Council" },
  { id: 45, name: "Hyderabad Medical Council" },
  { id: 10, name: "Himachal Pradesh Medical Council" },
  { id: 11, name: "Jammu & Kashmir Medical Council" },
  { id: 12, name: "Jharkhand Medical Council" },
  { id: 13, name: "Karnataka Medical Council" },
  { id: 46, name: "Medical Council of India" },
  { id: 47, name: "Medical Council of Tanganyika" },
  { id: 26, name: "Manipur Medical Council" },
  { id: 36, name: "Madras Medical Council" },
  { id: 15, name: "Madhya Pradesh Medical Council" },
  { id: 35, name: "Mahakoshal Medical Council" },
  { id: 16, name: "Maharashtra Medical Council" },
  { id: 42, name: "Mizoram Medical Council" },
  { id: 37, name: "Mysore Medical Council" },
  { id: 41, name: "Nagaland Medical Council" },
  { id: 17, name: "Orissa Council of Medical Registration" },
  { id: 38, name: "Pondicherry Medical Council" },
  { id: 18, name: "Punjab Medical Council" },
  { id: 19, name: "Rajasthan Medical Council" },
  { id: 43, name: "Telangana State Medical Council" },
  { id: 50, name: "Travancore Cochin Medical Council, Trivandrum" },
  { id: 22, name: "Tripura State Medical Council" },
  { id: 23, name: "Uttar Pradesh Medical Council" },
  { id: 24, name: "Uttarakhand Medical Council" },
  { id: 40, name: "Vidharba Medical Council" },
  { id: 20, name: "Sikkim Medical Council" },
  { id: 21, name: "Tamil Nadu Medical Council" },
  { id: 25, name: "West Bengal Medical Council" },
];

export const weekdays = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const departments = [
  "Eye Care",
  "gynecologist",
  "psychotherapist",
  "orthopedic",
  "dentist",
  "gastrologist",
  "urologist",
  "neurologist",
];

export const addDoctorFieldsUpdate = [
  ["Name", "name", "text"],
  ["Email", "email", "email"],
  ["Password", "password", "password"],
  ["Phone", "phone", "text"],
  ["Date of Birth", "dob", "date"],
  ["Gender", "gender", "select", ["Male", "Female", "Other"]], // Added 'select' with options
  [
    "Department",
    "doctorDepartment",
    "select",
    [
      "Eye Care",
      "Gynecologist",
      "Psychotherapist",
      "Orthopedic",
      "Dentist",
      "Gastrologist",
      "Urologist",
      "Neurologist",
    ],
  ],
  ["Registration Number", "registrationNumber", "text"],
  ["Year of Registration", "year", "text"],
  ["Fee Per Consultation", "feePerConsultation", "number"],
  ["Status", "status", "select", ["Pending", "Accepted", "Rejected"]],
];

export const addDoctorFields = [
  ["Name", "name", "text"],
  ["Email", "email", "email"],
  ["Password", "password", "password"],
  ["Phone", "phone", "text"],
  ["Date of Birth", "dob", "date"],
  ["Gender", "gender", "select", ["Male", "Female", "Other"]], // Added 'select' with options
  [
    "Department",
    "doctorDepartment",
    "select",
    [
      "Eye Care",
      "Gynecologist",
      "Psychotherapist",
      "Orthopedic",
      "Dentist",
      "Gastrologist",
      "Urologist",
      "Neurologist",
    ],
  ],
  ["Registration Number", "registrationNumber", "text"],
  ["Year of Registration", "year", "text"],
  ["Fee Per Consultation", "feePerConsultation", "number"],
];

export const fakePatients = [
  {
    id: 1,
    name: "Thelma Arnoll",
    email: "tarnoll0@netscape.com",
  },
  {
    id: 2,
    name: "Celestina Rattray",
    email: "crattray1@digg.com",
  },
  {
    id: 3,
    name: "Archie Le Breton",
    email: "ale2@google.it",
  },
  {
    id: 4,
    name: "Ivonne Hollows",
    email: "ihollows3@amazon.com",
  },
  {
    id: 5,
    name: "Lefty Whooley",
    email: "lwhooley4@cnet.com",
  },
  {
    id: 6,
    name: "Mozes MacGaughy",
    email: "mmacgaughy5@google.fr",
  },
  {
    id: 7,
    name: "Debi Porrett",
    email: "dporrett6@linkedin.com",
  },
  {
    id: 8,
    name: "Leesa Kubach",
    email: "lkubach7@un.org",
  },
  {
    id: 9,
    name: "Mira Haker",
    email: "mhaker8@liveinternet.ru",
  },
  {
    id: 10,
    name: "Robena McCardle",
    email: "rmccardle9@japanpost.jp",
  },
  {
    id: 11,
    name: "Burt Seawright",
    email: "bseawrighta@slashdot.org",
  },
  {
    id: 12,
    name: "Thaddeus O'Cassidy",
    email: "tocassidyb@privacy.gov.au",
  },
  {
    id: 13,
    name: "Birgitta Jeanequin",
    email: "bjeanequinc@fda.gov",
  },
  {
    id: 14,
    name: "Joe Simenon",
    email: "jsimenond@symantec.com",
  },
  {
    id: 15,
    name: "Maryann Isenor",
    email: "misenore@bluehost.com",
  },
  {
    id: 16,
    name: "Mattheus Josefsohn",
    email: "mjosefsohnf@epa.gov",
  },
  {
    id: 17,
    name: "Cherish Simmers",
    email: "csimmersg@addthis.com",
  },
  {
    id: 18,
    name: "Cherish Addy",
    email: "caddyh@microsoft.com",
  },
  {
    id: 19,
    name: "Miof mela Mottershead",
    email: "mmelai@icio.us",
  },
  {
    id: 20,
    name: "Skelly Gresser",
    email: "sgresserj@twitpic.com",
  },
  {
    id: 21,
    name: "Kirbee Bendixen",
    email: "kbendixenk@nhs.uk",
  },
  {
    id: 22,
    name: "Costa Longo",
    email: "clongol@chicagotribune.com",
  },
  {
    id: 23,
    name: "Adey Yuryshev",
    email: "ayuryshevm@biglobe.ne.jp",
  },
  {
    id: 24,
    name: "Sherri Lefwich",
    email: "slefwichn@booking.com",
  },
  {
    id: 25,
    name: "Violet Harrower",
    email: "vharrowero@instagram.com",
  },
  {
    id: 26,
    name: "Gill Tiebe",
    email: "gtiebep@meetup.com",
  },
  {
    id: 27,
    name: "Briny Fance",
    email: "bfanceq@ted.com",
  },
  {
    id: 28,
    name: "Donny Killiam",
    email: "dkilliamr@pen.io",
  },
  {
    id: 29,
    name: "Fidel Purple",
    email: "fpurples@upenn.edu",
  },
  {
    id: 30,
    name: "Evangelina Fish",
    email: "efisht@bloglovin.com",
  },
  {
    id: 31,
    name: "Bryon Firbanks",
    email: "bfirbanksu@last.fm",
  },
  {
    id: 32,
    name: "Michel Jacke",
    email: "mjackev@live.com",
  },
  {
    id: 33,
    name: "Ken Aspinall",
    email: "kaspinallw@twitpic.com",
  },
  {
    id: 34,
    name: "Nichole Muncer",
    email: "nmuncerx@cbc.ca",
  },
  {
    id: 35,
    name: "Pail Cannop",
    email: "pcannopy@intel.com",
  },
  {
    id: 36,
    name: "Seumas O'Hare",
    email: "soharez@simplemachines.org",
  },
  {
    id: 37,
    name: "Madelon Tohill",
    email: "mtohill10@eepurl.com",
  },
  {
    id: 38,
    name: "Vivianne Yorke",
    email: "vyorke11@huffingtonpost.com",
  },
  {
    id: 39,
    name: "Carissa Gergher",
    email: "cgergher12@nba.com",
  },
  {
    id: 40,
    name: "Lance Gerty",
    email: "lgerty13@techcrunch.com",
  },
  {
    id: 41,
    name: "Evelyn Knee",
    email: "eknee14@cnbc.com",
  },
  {
    id: 42,
    name: "Haskell Baynom",
    email: "hbaynom15@wsj.com",
  },
  {
    id: 43,
    name: "Bekki Southerden",
    email: "bsoutherden16@hubpages.com",
  },
  {
    id: 44,
    name: "Fernando Cranefield",
    email: "fcranefield17@psu.edu",
  },
  {
    id: 45,
    name: "Guy Robart",
    email: "grobart18@hexun.com",
  },
  {
    id: 46,
    name: "Lock Busby",
    email: "lbusby19@pen.io",
  },
  {
    id: 47,
    name: "Alfons Rizzotto",
    email: "arizzotto1a@livejournal.com",
  },
  {
    id: 48,
    name: "Simonne Luxon",
    email: "sluxon1b@tinyurl.com",
  },
  {
    id: 49,
    name: "Carlynn Dewhirst",
    email: "cdewhirst1c@xing.com",
  },
  {
    id: 50,
    name: "Teresina Male",
    email: "tmale1d@amazon.co.uk",
  },
];