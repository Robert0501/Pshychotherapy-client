import React, { useEffect, useState } from 'react';
import ServiceModel from '../../../models/models/service-model.tsx';
import ServiceCard from '../../../components/services/services.card.tsx';

function AdminServices() {
  const [services, setServices] = useState<ServiceModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [serviceFields, setServiceFields] = useState([
    {
      title: '',
      duration: '',
      price: '',
      primaryObjectives: [''],
      secondaryObjectives: [''],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://localhost:7053/api/Theraphy/all');
      const result = await response.json();
      setServices(result);
    };

    fetchData();
  }, []);

  const addObjective = (index, type) => {
    const updatedFields = [...serviceFields];
    updatedFields[index][type].push('');
    setServiceFields(updatedFields);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...serviceFields];
    updatedFields[index][name] = value;
    setServiceFields(updatedFields);
  };

  const handleObjectiveChange = (serviceIndex, objectiveIndex, event, type) => {
    const updatedFields = [...serviceFields];
    updatedFields[serviceIndex][type][objectiveIndex] = event.target.value;
    setServiceFields(updatedFields);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch('https://localhost:7053/api/Theraphy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceFields[0]),
    });

    if (response.ok) {
      // Fetch the updated service list
      const updatedResponse = await fetch(
        'https://localhost:7053/api/Theraphy/all'
      );
      const updatedServices = await updatedResponse.json();

      setServices(updatedServices); // Update the list
      setShowModal(false);
      setServiceFields([
        {
          title: '',
          duration: '',
          price: '',
          primaryObjectives: [''],
          secondaryObjectives: [''],
        },
      ]);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setServiceFields([
      {
        title: '',
        duration: '',
        price: '',
        primaryObjectives: [''],
        secondaryObjectives: [''],
      },
    ]);
  };

  return (
    <>
      <div>
        <button onClick={() => setShowModal(true)} className="btn-add-service">
          Adauga un nou serviciu
        </button>
      </div>
      <div className="container">
        {services.map((service, index) => (
          <ServiceCard key={index} serviceCard={service} />
        ))}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content responsive-modal">
              <button onClick={handleClose} className="close-button">
                &times;
              </button>
              <h2 className="modal-title">Add New Service</h2>
              <div className="form-container">
                {serviceFields.map((field, index) => (
                  <div key={index} className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={field.title}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      value={field.duration}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Price</label>
                    <input
                      type="text"
                      name="price"
                      value={field.price}
                      onChange={(e) => handleChange(index, e)}
                    />
                    <label>Primary Objectives</label>
                    {field.primaryObjectives.map((objective, objIndex) => (
                      <div key={objIndex} className="objective-group">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) =>
                            handleObjectiveChange(
                              index,
                              objIndex,
                              e,
                              'primaryObjectives'
                            )
                          }
                        />
                        {objIndex === field.primaryObjectives.length - 1 && (
                          <button
                            onClick={() =>
                              addObjective(index, 'primaryObjectives')
                            }
                            className="add-field-button"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                    <label>Secondary Objectives</label>
                    {field.secondaryObjectives.map((objective, objIndex) => (
                      <div key={objIndex} className="objective-group">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) =>
                            handleObjectiveChange(
                              index,
                              objIndex,
                              e,
                              'secondaryObjectives'
                            )
                          }
                        />
                        {objIndex === field.secondaryObjectives.length - 1 && (
                          <button
                            onClick={() =>
                              addObjective(index, 'secondaryObjectives')
                            }
                            className="add-field-button"
                          >
                            +
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <button onClick={handleSubmit} className="submit-button">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminServices;
