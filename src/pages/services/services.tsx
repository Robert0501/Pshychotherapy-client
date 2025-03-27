import React, { useEffect, useState } from 'react';

import '../../styles/services.css';
import ServiceCard from '../../components/services/services.card.tsx';
import ServiceModel from '../../models/models/service-model.ts';

function ServicePage() {
  const [services, setServices] = useState<ServiceModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://localhost:7053/api/Theraphy/all');
        const result = await response.json();
        setServices(result); 
    };

    fetchData();
  }, []);



  return (
    <div className="container">
      {services.map((service, index) => (
        <ServiceCard key={index} serviceCard={service} />
      ))}
    </div>
  );
}

export default ServicePage;
