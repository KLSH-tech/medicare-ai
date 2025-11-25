import { useState, useEffect, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { assets } from "../ai-chat/assets/assets";
import toast from 'react-hot-toast';

const ResourceMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 14.5995, lng: 120.9842 }); // Default: Manila

  const facilityTypes = [
    { id: 'all', name: 'All', icon: '🏥', color: '#A456F7' },
    { id: 'hospital', name: 'Hospitals', icon: '🏥', color: '#EF4444' },
    { id: 'pharmacy', name: 'Pharmacies', icon: '💊', color: '#10B981' },
    { id: 'clinic', name: 'Clinics', icon: '🏨', color: '#3B82F6' },
    { id: 'emergency', name: 'Emergency', icon: '🚑', color: '#F59E0B' },
  ];

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
          searchNearbyFacilities(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your location. Showing default area.');
          searchNearbyFacilities(mapCenter);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      searchNearbyFacilities(mapCenter);
    }
  }, []);

  // Search for nearby medical facilities
  const searchNearbyFacilities = useCallback((location) => {
    setLoading(true);
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div')
    );

    const types = ['hospital', 'pharmacy', 'doctor', 'health'];
    const allFacilities = [];

    let completedRequests = 0;

    types.forEach((type) => {
      const request = {
        location: new window.google.maps.LatLng(location.lat, location.lng),
        radius: 5000, // 5km radius
        type: type,
      };

      service.nearbySearch(request, (results, status) => {
        completedRequests++;
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const processed = results.map((place) => ({
            id: place.place_id,
            name: place.name,
            address: place.vicinity,
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
            type: categorizeFacility(place.types),
            rating: place.rating || 'N/A',
            isOpen: place.opening_hours?.open_now,
            photos: place.photos?.[0]?.getUrl({ maxWidth: 400 }),
          }));
          allFacilities.push(...processed);
        }

        if (completedRequests === types.length) {
          // Remove duplicates
          const unique = Array.from(
            new Map(allFacilities.map((item) => [item.id, item])).values()
          );
          setFacilities(unique);
          setLoading(false);
        }
      });
    });
  }, []);

  // Categorize facility based on Google types
  const categorizeFacility = (types) => {
    if (types.includes('hospital')) return 'hospital';
    if (types.includes('pharmacy') || types.includes('drugstore')) return 'pharmacy';
    if (types.includes('doctor') || types.includes('dentist')) return 'clinic';
    if (types.includes('emergency')) return 'emergency';
    return 'clinic';
  };

  // Get marker color based on type
  const getMarkerColor = (type) => {
    const colors = {
      hospital: '#EF4444',
      pharmacy: '#10B981',
      clinic: '#3B82F6',
      emergency: '#F59E0B',
    };
    return colors[type] || '#A456F7';
  };

  // Filter facilities
  const filteredFacilities =
    activeFilter === 'all'
      ? facilities
      : facilities.filter((f) => f.type === activeFilter);

  // Get directions
  const getDirections = (facility) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.location.lat},${facility.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#1A1A2E]">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200 dark:border-white/20 bg-white dark:bg-[#1A1A2E]">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🗺️ Resource Map
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Find nearby hospitals, clinics, pharmacies, and emergency centers
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="p-4 flex gap-2 overflow-x-auto bg-white dark:bg-[#1A1A2E] border-b border-gray-200 dark:border-white/20">
        {facilityTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveFilter(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              activeFilter === type.id
                ? 'bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-white shadow-lg'
                : 'bg-gray-100 dark:bg-[#57317C]/30 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-[#57317C]/50'
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.name}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
              {type.id === 'all'
                ? facilities.length
                : facilities.filter((f) => f.type === type.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-[#1A1A2E]/80 z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#A456F7] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Finding nearby facilities...
              </p>
            </div>
          </div>
        )}

        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={mapCenter}
            center={mapCenter}
            defaultZoom={14}
            mapId="medicare-map"
            className="w-full h-full"
          >
            {/* User Location Marker */}
            {userLocation && (
              <AdvancedMarker position={userLocation}>
                <div className="w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </AdvancedMarker>
            )}

            {/* Facility Markers */}
            {filteredFacilities.map((facility) => (
              <AdvancedMarker
                key={facility.id}
                position={facility.location}
                onClick={() => setSelectedFacility(facility)}
              >
                <Pin
                  background={getMarkerColor(facility.type)}
                  borderColor="#fff"
                  glyphColor="#fff"
                />
              </AdvancedMarker>
            ))}

            {/* Info Window */}
            {selectedFacility && (
              <InfoWindow
                position={selectedFacility.location}
                onCloseClick={() => setSelectedFacility(null)}
              >
                <div className="p-2 max-w-xs">
                  {selectedFacility.photos && (
                    <img
                      src={selectedFacility.photos}
                      alt={selectedFacility.name}
                      className="w-full h-32 object-cover rounded-md mb-2"
                    />
                  )}
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {selectedFacility.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {selectedFacility.address}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      ⭐ {selectedFacility.rating}
                    </span>
                    {selectedFacility.isOpen !== undefined && (
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          selectedFacility.isOpen
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {selectedFacility.isOpen ? '🟢 Open' : '🔴 Closed'}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => getDirections(selectedFacility)}
                    className="w-full bg-gradient-to-r from-[#A456F7] to-[#3D81F6] text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all"
                  >
                    📍 Get Directions
                  </button>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Facilities List (Mobile) */}
      <div className="md:hidden max-h-48 overflow-y-auto bg-white dark:bg-[#1A1A2E] border-t border-gray-200 dark:border-white/20 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Nearby Facilities ({filteredFacilities.length})
        </h3>
        <div className="space-y-2">
          {filteredFacilities.slice(0, 5).map((facility) => (
            <div
              key={facility.id}
              onClick={() => {
                setSelectedFacility(facility);
                setMapCenter(facility.location);
              }}
              className="p-3 bg-gray-50 dark:bg-[#57317C]/20 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-[#57317C]/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">
                  {facilityTypes.find((t) => t.id === facility.type)?.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                    {facility.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {facility.address}
                  </p>
                  <span className="text-xs text-yellow-600">
                    ⭐ {facility.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceMap;
