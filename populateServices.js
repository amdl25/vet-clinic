import { collection, addDoc } from 'firebase/firestore';
import firebaseConfig from './db_config/firebaseConfig.js';
const { db } = firebaseConfig;


const services = [
    {
      name: "Vaccinare anuală",
      description: "Vaccinarea anuală este esențială pentru prevenirea unor boli grave și pentru menținerea sănătății animalului. Aceasta include vaccinurile standard necesare pentru protejarea împotriva bolilor comune.",
      price: 100,
      category: { id: "cat_001", name: "Vaccinuri" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    },
    {
      name: "Deparazitare internă sau externă",
      description: "Tratament pentru eliminarea paraziților interni și externi, inclusiv pentru câini și pisici.",
      price: 100,
      category: { id: "cat_002", name: "Tratamente" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    },
    {
      name: "Consultație generală",
      description: "Oferim o evaluare completă a stării de sănătate a animalului tău. Aceasta include un control fizic general, verificarea greutății, a urechilor, ochilor și a dinților, precum și recomandări pentru menținerea unei sănătăți optime.",
      price: 100,
      category: { id: "cat_003", name: "Consultatii" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    },
    {
      name: "Frizerie",
      description: "Oferim servicii complete de îngrijire estetică pentru animalele tale dragi, inclusiv tăierea unghiilor, băi, îngrijire a blănii și tunsori personalizate. Îngrijirea corespunzătoare ajută la menținerea sănătății blănii și a pielii, iar animalele tale vor arăta și se vor simți minunat!",
      price: 80,
      category: { id: "cat_004", name: "Îngrijire estetică" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    },
    {
      name: "Sterilizare",
      description: "Sterilizarea este o procedură sigură și eficientă care ajută la prevenirea unor probleme de sănătate.",
      price: 300,
      category: { id: "cat_005", name: "Chirurgie" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    },
    {
      name: "Detartraj dentar",
      description: "Servicii pentru îngrijirea dinților animalelor, eliminarea tartrului și prevenirea problemelor dentare.",
      price: 200,
      category: { id: "cat_006", name: "Îngrijire dentară" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    },
    {
      name: "Analize de laborator",
      description: "Realizăm analize de laborator pentru diagnosticarea bolilor și monitorizarea sănătății animalelor, inclusiv teste de sânge și urină.",
      price: 100,
      category: { id: "cat_007", name: "Analize" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    },
    {
      name: "Ecografie abdominală",
      description: "Examinarea ecografică pentru a verifica sănătatea organelor interne ale animalului.",
      price: 250,
      category: { id: "cat_008", name: "Ecografie" },
      metadata: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
    }
  ];
  

const addServices = async () => {
  for (const service of services) {
    try {
      await addDoc(collection(db, 'services'), service);
      console.log(`Serviciu adăugat: ${service.name}`);
    } catch (error) {
      console.error('Eroare la adăugarea serviciului:', error);
    }
  }
};

addServices();
