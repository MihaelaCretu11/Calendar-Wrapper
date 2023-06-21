import axios from "axios";

const API_EVENTS_URL = "http://localhost:8080/api/events/";
const API_EVENTS_URL2 = "http://localhost:8080/api/getEventsByInterval/";
const API_RECURSIVE_EVENTS_URL = "http://localhost:8080/api/recursiveEvents/";

const createEvent = async (eventData) => {
  const response = await axios.post(API_EVENTS_URL, eventData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getEvents = async () => {
  const response = await axios.get(API_EVENTS_URL);
  return response.data;
};

const getEventById = async (eventId) => {
  const response = await axios.get(`${API_EVENTS_URL}${eventId}`);
  return response.data;
};

const editEvent = async (eventData) => {
  const response = await axios.put(
    `${API_EVENTS_URL}edit/${eventData.id}`,
    eventData
  );
  return response.data;
};

const getEventsByInterval = async (eventData) => {
  const response = await axios.get(
    `${API_EVENTS_URL2}?startDate=${eventData.startDate.format(
      "YYYY-MM-DD"
    )}&endDate=${eventData.endDate.format("YYYY-MM-DD")}`
  );
  return response.data;
};

const createRecursiveEvent = async (eventData) => {
  const response = await axios.post(API_RECURSIVE_EVENTS_URL, eventData, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const getRecursiveEventById = async (eventId) => {
  const response = await axios.get(`${API_RECURSIVE_EVENTS_URL}${eventId}`);
  return response.data;
};

const getRecursiveEvents = async () => {
  const response = await axios.get(API_RECURSIVE_EVENTS_URL);
  return response.data;
};

const editRecursiveEvent = async (eventData) => {
  const response = await axios.put(
    `${API_RECURSIVE_EVENTS_URL}edit/${eventData.id}`,
    eventData
  );
  return response.data;
};

const deleteRecursiveEvent = async (data) => {
  const response = await axios.delete(`${API_RECURSIVE_EVENTS_URL}${data.id}`, {
    headers: {
      // Overwrite Axios's automatically set Content-Type
      "Content-Type": "application/json",
    },
    data: { data },
  })

  return response.data
}

const eventsService = {
  createEvent,
  getEvents,
  getEventById,
  editEvent,
  getEventsByInterval,
  createRecursiveEvent,
  getRecursiveEvents,
  getRecursiveEventById,
  editRecursiveEvent,
  deleteRecursiveEvent
};
export default eventsService;
