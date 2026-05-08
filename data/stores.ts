export type Provincia = 
  | "Buenos Aires"
  | "CABA"
  | "Catamarca"
  | "Chaco"
  | "Chubut"
  | "Córdoba"
  | "Corrientes"
  | "Entre Ríos"
  | "Formosa"
  | "Jujuy"
  | "La Pampa"
  | "La Rioja"
  | "Mendoza"
  | "Misiones"
  | "Neuquén"
  | "Río Negro"
  | "Salta"
  | "San Juan"
  | "San Luis"
  | "Santa Cruz"
  | "Santa Fe"
  | "Santiago del Estero"
  | "Tierra del Fuego"
  | "Tucumán";

export type Zona = 
  | "CABA"
  | "GBA Norte"
  | "GBA Sur"
  | "GBA Oeste"
  | "Córdoba"
  | "Rosario"
  | "Mendoza"
  | "Tucumán"
  | "Neuquén"
  | "Otros";

export interface Store {
  id: string;
  name: string;
  address: string;
  provincia: Provincia;
  zona: Zona;
  lat: number;
  lng: number;
  googleMapsUrl?: string;
}

export const provincias: { value: string; label: string }[] = [
  { value: "all", label: "Todas las provincias" },
  { value: "Buenos Aires", label: "Buenos Aires" },
  { value: "CABA", label: "Ciudad Autónoma de Bs As" },
  { value: "Catamarca", label: "Catamarca" },
  { value: "Chaco", label: "Chaco" },
  { value: "Chubut", label: "Chubut" },
  { value: "Córdoba", label: "Córdoba" },
  { value: "Corrientes", label: "Corrientes" },
  { value: "Entre Ríos", label: "Entre Ríos" },
  { value: "Formosa", label: "Formosa" },
  { value: "Jujuy", label: "Jujuy" },
  { value: "La Pampa", label: "La Pampa" },
  { value: "La Rioja", label: "La Rioja" },
  { value: "Mendoza", label: "Mendoza" },
  { value: "Misiones", label: "Misiones" },
  { value: "Neuquén", label: "Neuquén" },
  { value: "Río Negro", label: "Río Negro" },
  { value: "Salta", label: "Salta" },
  { value: "San Juan", label: "San Juan" },
  { value: "San Luis", label: "San Luis" },
  { value: "Santa Cruz", label: "Santa Cruz" },
  { value: "Santa Fe", label: "Santa Fe" },
  { value: "Santiago del Estero", label: "Santiago del Estero" },
  { value: "Tierra del Fuego", label: "Tierra del Fuego" },
  { value: "Tucumán", label: "Tucumán" },
];

export const zonas: { value: string; label: string }[] = [
  { value: "all", label: "Todas las zonas" },
  { value: "CABA", label: "CABA" },
  { value: "GBA Norte", label: "GBA Norte" },
  { value: "GBA Sur", label: "GBA Sur" },
  { value: "GBA Oeste", label: "GBA Oeste" },
  { value: "Córdoba", label: "Córdoba" },
  { value: "Rosario", label: "Rosario" },
  { value: "Mendoza", label: "Mendoza" },
  { value: "Tucumán", label: "Tucumán" },
  { value: "Neuquén", label: "Neuquén" },
];

export const WHATSAPP_NUMBER = "+5491164700007";
export const WHATSAPP_URL = `https://wa.me/5491164700007`;

// Sample stores data - can be expanded with real data
export const stores: Store[] = [
  // CABA
  {
    id: "1",
    name: "National Game S.A.",
    address: "Paraguay 577 5º A, Capital Federal",
    provincia: "CABA",
    zona: "CABA",
    lat: -34.5997,
    lng: -58.3797,
  },
  {
    id: "2",
    name: "Mali Sociedad de Hecho",
    address: "Azcuénaga 365, Capital Federal",
    provincia: "CABA",
    zona: "CABA",
    lat: -34.6037,
    lng: -58.4017,
  },
  {
    id: "3",
    name: "Librería Central",
    address: "Av. Corrientes 1234, Capital Federal",
    provincia: "CABA",
    zona: "CABA",
    lat: -34.6045,
    lng: -58.3857,
  },
  // GBA Sur
  {
    id: "4",
    name: "Biyemas S.A.",
    address: "Mitre 219, Avellaneda",
    provincia: "Buenos Aires",
    zona: "GBA Sur",
    lat: -34.6627,
    lng: -58.3657,
  },
  {
    id: "5",
    name: "Bingo Adrogue S.A.",
    address: "Hipólito Yrigoyen 13436, Adrogué",
    provincia: "Buenos Aires",
    zona: "GBA Sur",
    lat: -34.8102,
    lng: -58.4000,
    googleMapsUrl: "https://www.google.com/maps/dir//ABV,+Av.+Hip%C3%B3lito+Yrigoyen+13384,+B1846+Adrogu%C3%A9",
  },
  {
    id: "6",
    name: "Godel Quilmes S.A.",
    address: "Alem 27, Quilmes",
    provincia: "Buenos Aires",
    zona: "GBA Sur",
    lat: -34.7207,
    lng: -58.2577,
  },
  {
    id: "7",
    name: "KeLibrería",
    address: "Quilmes Centro",
    provincia: "Buenos Aires",
    zona: "GBA Sur",
    lat: -34.7237,
    lng: -58.2617,
  },
  // GBA Norte
  {
    id: "8",
    name: "Librería San Isidro",
    address: "Av. Centenario 450, San Isidro",
    provincia: "Buenos Aires",
    zona: "GBA Norte",
    lat: -34.4708,
    lng: -58.5287,
  },
  {
    id: "9",
    name: "Papelería Vicente López",
    address: "Av. Maipú 1280, Vicente López",
    provincia: "Buenos Aires",
    zona: "GBA Norte",
    lat: -34.5265,
    lng: -58.4720,
  },
  {
    id: "10",
    name: "Arte & Diseño Tigre",
    address: "Av. Cazón 580, Tigre",
    provincia: "Buenos Aires",
    zona: "GBA Norte",
    lat: -34.4267,
    lng: -58.5797,
  },
  // GBA Oeste
  {
    id: "11",
    name: "Distribuidora Morón",
    address: "Av. Rivadavia 18200, Morón",
    provincia: "Buenos Aires",
    zona: "GBA Oeste",
    lat: -34.6517,
    lng: -58.6197,
  },
  {
    id: "12",
    name: "Librería Castelar",
    address: "Av. Iriarte 2450, Castelar",
    provincia: "Buenos Aires",
    zona: "GBA Oeste",
    lat: -34.6537,
    lng: -58.6497,
  },
  {
    id: "13",
    name: "Papelería Ituzaingó",
    address: "Santa Rosa 1120, Ituzaingó",
    provincia: "Buenos Aires",
    zona: "GBA Oeste",
    lat: -34.6577,
    lng: -58.6737,
  },
  // Córdoba
  {
    id: "14",
    name: "Librería Córdoba Centro",
    address: "Av. Colón 245, Córdoba Capital",
    provincia: "Córdoba",
    zona: "Córdoba",
    lat: -31.4201,
    lng: -64.1888,
  },
  {
    id: "15",
    name: "Distribuidora Serrano",
    address: "Bv. San Juan 1180, Córdoba",
    provincia: "Córdoba",
    zona: "Córdoba",
    lat: -31.4135,
    lng: -64.1810,
  },
  {
    id: "16",
    name: "Arte Total Córdoba",
    address: "Av. Vélez Sársfield 567, Córdoba",
    provincia: "Córdoba",
    zona: "Córdoba",
    lat: -31.4195,
    lng: -64.1920,
  },
  // Rosario
  {
    id: "17",
    name: "Librería Rosario Central",
    address: "Córdoba 1250, Rosario",
    provincia: "Santa Fe",
    zona: "Rosario",
    lat: -32.9442,
    lng: -60.6505,
  },
  {
    id: "18",
    name: "Papelería del Paraná",
    address: "San Martín 890, Rosario",
    provincia: "Santa Fe",
    zona: "Rosario",
    lat: -32.9468,
    lng: -60.6393,
  },
  {
    id: "19",
    name: "Distribuidora Fisherton",
    address: "Av. Eva Perón 5670, Rosario",
    provincia: "Santa Fe",
    zona: "Rosario",
    lat: -32.9355,
    lng: -60.7120,
  },
  // Mendoza
  {
    id: "20",
    name: "Librería Mendoza Centro",
    address: "San Martín 1450, Mendoza Capital",
    provincia: "Mendoza",
    zona: "Mendoza",
    lat: -32.8908,
    lng: -68.8272,
  },
  {
    id: "21",
    name: "Arte & Letras Mendoza",
    address: "Av. Las Heras 780, Mendoza",
    provincia: "Mendoza",
    zona: "Mendoza",
    lat: -32.8868,
    lng: -68.8350,
  },
  {
    id: "22",
    name: "Distribuidora Cuyo",
    address: "Av. San Martín 2340, Godoy Cruz",
    provincia: "Mendoza",
    zona: "Mendoza",
    lat: -32.9265,
    lng: -68.8420,
  },
  // Tucumán
  {
    id: "23",
    name: "Librería Tucumán Plaza",
    address: "24 de Septiembre 560, San Miguel de Tucumán",
    provincia: "Tucumán",
    zona: "Tucumán",
    lat: -26.8241,
    lng: -65.2226,
  },
  {
    id: "24",
    name: "Papelería del Norte",
    address: "Av. Mate de Luna 2890, Tucumán",
    provincia: "Tucumán",
    zona: "Tucumán",
    lat: -26.8150,
    lng: -65.2350,
  },
  {
    id: "25",
    name: "Arte Tucumano",
    address: "San Martín 780, San Miguel de Tucumán",
    provincia: "Tucumán",
    zona: "Tucumán",
    lat: -26.8301,
    lng: -65.2050,
  },
  // Neuquén
  {
    id: "26",
    name: "Librería Neuquén Centro",
    address: "Av. Argentina 350, Neuquén Capital",
    provincia: "Neuquén",
    zona: "Neuquén",
    lat: -38.9516,
    lng: -68.0591,
  },
  {
    id: "27",
    name: "Papelería Patagonia",
    address: "San Martín 1250, Neuquén",
    provincia: "Neuquén",
    zona: "Neuquén",
    lat: -38.9550,
    lng: -68.0650,
  },
  {
    id: "28",
    name: "Distribuidora Sur",
    address: "Av. Olascoaga 890, Neuquén",
    provincia: "Neuquén",
    zona: "Neuquén",
    lat: -38.9480,
    lng: -68.0520,
  },
];
