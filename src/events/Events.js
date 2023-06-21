import React, { useState } from "react";
import BestCalendar from "../React-Calendar/src/BestCalendar";
import {
  createEvent,
  editEvent,
  getEventsByInterval,
  getEventById,
  clearCurrentEvent,
  clearCurrentRecursiveEvent,
  createRecursiveEvent,
  getRecursiveEvents,
  getRecursiveEventById,
  editRecursiveEvent,
} from "./EventsSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import moment from "moment";

let defaultEvent = {};
const options = [
  {
    value: "no",
    label: "No",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "annually",
    label: "Annually",
  },
];

export default function Events() {
  const dispatch = useDispatch();
  const {
    normalEvents,
    recursiveEvents,
    currentEvent,
    currentRecursiveEvent,
    isLoading,
  } = useSelector((state) => state.events);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    dispatch(clearCurrentEvent());
    dispatch(clearCurrentRecursiveEvent());
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    const event = {
      title: values.title,
      startDate: moment(values.startDate).format("YYYY-MM-DD"),
      endDate: moment(values.endDate).format("YYYY-MM-DD"),
      startHour: values.startHour
        ? moment(values.startHour).format("HH:mm")
        : null,
      endHour: values.endHour ? moment(values.endHour).format("HH:mm") : null,
      recursive: values.recursive,
    };

    values.recursive !== "no"
      ? currentRecursiveEvent
        ? dispatch(
            editRecursiveEvent({ ...event, id: currentRecursiveEvent.id })
          )
        : dispatch(createRecursiveEvent(event))
      : currentEvent
      ? dispatch(editEvent({ ...event, id: currentEvent.id }))
      : dispatch(createEvent(event));
    setIsModalOpen(false);
  };

  const buttonText =
    currentEvent !== null
      ? `Update Event`
      : currentRecursiveEvent !== null
      ? `Update Event`
      : `Create Event`;

  const ModalPopUp = () => {
    return (
      <Modal
        title="Create a New Event"
        open={!isLoading && isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            <Button form="eventForm" key="submit" htmlType="submit">
              {buttonText}
            </Button>
          </>
        }
      >
        <Form
          onFinish={onFinish}
          id="eventForm"
          initialValues={
            currentEvent
              ? {
                  title: currentEvent.title,
                  startDate: moment(currentEvent.startDate),
                  endDate: moment(currentEvent.endDate),
                  startHour: currentEvent.startHour
                    ? moment(currentEvent.startHour, "HH:mm")
                    : null,
                  endHour: currentEvent.endHour
                    ? moment(currentEvent.endHour, "HH:mm")
                    : null,
                  recursive: currentEvent.recursive
                    ? currentEvent.recursive
                    : null,
                }
              : currentRecursiveEvent
              ? {
                  title: currentRecursiveEvent.title,
                  startDate: moment(currentRecursiveEvent.startDate),
                  endDate: moment(currentRecursiveEvent.endDate),
                  startHour: currentRecursiveEvent.startHour
                    ? moment(currentRecursiveEvent.startHour, "HH:mm")
                    : null,
                  endHour: currentRecursiveEvent.endHour
                    ? moment(currentRecursiveEvent.endHour, "HH:mm")
                    : null,
                  recursive: currentRecursiveEvent.recursive
                    ? currentRecursiveEvent.recursive
                    : null,
                }
              : defaultEvent
          }
        >
          <Form.Item label="Event title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Start Date" name="startDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="End Date" name="endDate">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Start Hour" name="startHour">
            <TimePicker />
          </Form.Item>
          <Form.Item label="End Hour" name="endHour">
            <TimePicker />
          </Form.Item>
          <Form.Item label="Recursive" name="recursive">
            <Select
              style={{
                width: 120,
              }}
              options={options}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const fetchEventsByInterval = (interval) => {
    dispatch(getEventsByInterval(interval));
    dispatch(getRecursiveEvents());
  };
  
  const getCurrentEventById = (eventId, recursive) => {
    recursive !== "no"
      ? dispatch(getRecursiveEventById(eventId))
      : dispatch(getEventById(eventId));
  };

  const editEventData = (eventData) => {
    eventData.recursive !== "no"
      ? dispatch(
          editRecursiveEvent({
            title: eventData.title,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            id: eventData.id,
            startHour: eventData.startHour ? eventData.startHour : null,
            endHour: eventData.endHour ? eventData.endHour : null,
            recursive: eventData.recursive,
          })
        )
      : dispatch(
          editEvent({
            title: eventData.title,
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            id: eventData.id,
            startHour: eventData.startHour ? eventData.startHour : null,
            endHour: eventData.endHour ? eventData.endHour : null,
            recursive: eventData.recursive,
          })
        );
  };

  const makeDefaultEvent = (interval) =>
    (defaultEvent = {
      ...interval,
      recursive: "no",
    });

  return (
    <div>
      <BestCalendar
        normalEvents={normalEvents}
        recursiveEvents={recursiveEvents}
        fetchEventsByInterval={fetchEventsByInterval}
        ModalPopUp={ModalPopUp}
        handleOpenModal={handleOpenModal}
        makeDefaultEvent={makeDefaultEvent}
        getCurrentEventById={getCurrentEventById}
        editEventData={editEventData}
      />
    </div>
  );
}
