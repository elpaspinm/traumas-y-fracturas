import React, { useState, useEffect } from 'react'; // Importar useEffect
import PublicationChat from '../components/Publications/PublicationChat';

const PersonalPublicationsPage = ({ currentUserRole }) => {
  const [currentSection, setCurrentSection] = useState('interactions'); // 'interactions' or 'alerts'

  // Determinar la sección inicial y las opciones de navegación
  useEffect(() => {
    if (currentUserRole === 'pharmacist_viewer') {
      setCurrentSection('trainings'); // Si es personal farmacéutico, inicia en capacitaciones
    } else {
      setCurrentSection('interactions'); // Para otros roles, inicia en interacciones
    }
  }, [currentUserRole]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Publicaciones Farmacéuticas</h2>

      <div className="flex space-x-4 mb-6">
        {currentUserRole !== 'pharmacist_viewer' && ( // Solo mostrar si no es personal farmacéutico
          <>
            <button
              onClick={() => setCurrentSection('interactions')}
              className={`px-4 py-2 rounded-md transition-colors ${currentSection === 'interactions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Posibles Interacciones
            </button>
            <button
              onClick={() => setCurrentSection('alerts')}
              className={`px-4 py-2 rounded-md transition-colors ${currentSection === 'alerts' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Alertas Farmacéuticas
            </button>
          </>
        )}
        {currentUserRole === 'pharmacist_viewer' && (
          <button
            onClick={() => setCurrentSection('trainings')}
            className={`px-4 py-2 rounded-md transition-colors ${currentSection === 'trainings' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Capacitaciones
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {currentSection === 'interactions' && currentUserRole !== 'pharmacist_viewer' && (
          <PublicationChat chatKey="interactions_chat" title="Chat de Posibles Interacciones" canSendMessages={false} />
        )}
        {currentSection === 'alerts' && currentUserRole !== 'pharmacist_viewer' && (
          <PublicationChat chatKey="alerts_chat" title="Chat de Alertas Farmacéuticas" canSendMessages={false} />
        )}
        {currentSection === 'trainings' && currentUserRole === 'pharmacist_viewer' && (
          <PublicationChat chatKey="trainings_chat" title="Chat de Capacitaciones" canSendMessages={false} />
        )}
        {/* Mensaje si no hay contenido visible para el rol */}
        {currentSection !== 'trainings' && currentUserRole === 'pharmacist_viewer' && (
          <p className="text-gray-500">No tienes acceso a esta sección.</p>
        )}
      </div>
    </div>
  );
};

export default PersonalPublicationsPage;

// DONE