"use client";  // Mark this file as a Client Component

import React, { useReducer, useEffect, useMemo } from 'react';
import Layout from '@/components/Layout';
import Typography from '@mui/material/Typography';
import VolunteerForm from './components/VolunteerForm';
import SpecialWorkForm from './components/SpecialWorkForm';
// import CheckHoursForm from './components/CheckHour';

import { submitVolunteerForm, uploadFilesApi } from '@/app/api/Volunteer';
import { fetchVolunteerHours } from '@/app/api/CheckHour';
import { submitSpecialWorkForm } from '@/app/api/SpecialWork';
import { FormValues } from '@/types/IResponse';
import { State } from '@/types/IResponse';
// import CheckHoursWork from './components/CheckHour';

// Define action types
type Action =
  | { type: "SET_FORM_VALUES"; payload: FormValues }
  | { type: "SET_SUCCESS"; payload: string | null }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_VOLUNTEER_HOURS"; payload: number | null }
  | { type: "SET_SELECTED_FORM"; payload: string };

// Define initial state
const initialState: State = {
  selectedForm: "volunteerForm",
  formValues: {
    studentId: "",
    studentId1: "",
    title: "",
    firstName: "",
    nickname: "",
    graduate: "",
    branch: "",
    activityName: "",
    organizationName: "",
    organizationPhone: "",
    activityDescription: "",
    activityDate: "",
    hours: "",
    createDate: new Date().toISOString().slice(0, 10),
    loanStatus: "",
    yearLevel: "",
  },
  success: null,
  error: null,
  loading: false,
  volunteerHours: null,
};

// Define reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FORM_VALUES":
      return { ...state, formValues: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_VOLUNTEER_HOURS":
      return { ...state, volunteerHours: action.payload };
    case "SET_SELECTED_FORM":
      return {
        ...state,
        selectedForm: action.payload,
        volunteerHours:
          action.payload === "CheckHoursForm" ? state.volunteerHours : null,
      };
    default:
      return state;
  }
};

// Define component
const CheckVolunteerHoursForm: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { selectedForm, formValues, success, error, loading, volunteerHours } = state;

  // Memoize sidebar items
  const sidebarItems = useMemo(
    () => [
      { text: "ส่งชั่วโมงจิตอาสา", hook: () => handleSidebarClick("volunteerForm") },
      { text: "เช็คชั่วโมงจิตอาสา", hook: () => handleSidebarClick("CheckHoursForm") },
      { text: "ส่งชั่วโมงงานพิเศษ", hook: () => handleSidebarClick("SpecialWorkForm") },
    ],
    []
  );

  useEffect(() => {
    if (selectedForm === "CheckHoursForm" && formValues.studentId) {
      fetchAndSetVolunteerHours(formValues.studentId);
    }
  }, [formValues.studentId, selectedForm]);

  const fetchAndSetVolunteerHours = async (studentId: string) => {
    try {
      const data = await fetchVolunteerHours(studentId);
      dispatch({ type: "SET_VOLUNTEER_HOURS", payload: data.hours });
    } catch (err) {
      console.error("Error fetching volunteer hours:", err);
      const errorMessage =
        err?.response?.data?.message || "Failed to fetch volunteer hours.";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
    }
  };

  const handleSidebarClick = (formName: string) => {
    dispatch({ type: "SET_SELECTED_FORM", payload: formName });
    dispatch({ type: "SET_SUCCESS", payload: null });
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const handleSubmit = async (values: FormValues, files: File[]) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_SUCCESS", payload: null });

    try {
      // Call the appropriate API based on the selected form
      if (selectedForm === "volunteerForm") {
        await submitVolunteerForm(values);
        if (files.length) {
          await uploadFilesApi(files, values.studentId);
        }
      } else if (selectedForm === "SpecialWorkForm") {
        await submitSpecialWorkForm(values);
      }

      dispatch({
        type: "SET_SUCCESS",
        payload: "Form submitted successfully!",
      });

      if (values.studentId && selectedForm === "CheckHoursForm") {
        await fetchAndSetVolunteerHours(values.studentId);
      }
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "An error occurred while submitting the form. Please try again.",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <Layout sidebarItems={sidebarItems}>
      <main>
        {selectedForm === "CheckHoursForm" && volunteerHours !== null && (
          <Typography variant="h6">Volunteer Hours: {volunteerHours}</Typography>
        )}

        {selectedForm === "volunteerForm" && (
          <VolunteerForm
            onSubmit={handleSubmit}
            formValues={formValues}
            setFormValues={(values: any) =>
              dispatch({ type: "SET_FORM_VALUES", payload: values })
            }
            success={success}
            error={error}
            loading={loading}
            setError={(error: string | null) =>
              dispatch({ type: "SET_ERROR", payload: error })
            }
            setLoading={(loading: boolean) =>
              dispatch({ type: "SET_LOADING", payload: loading })
            }
            setSuccessMessage={(message: string | null) =>
              dispatch({ type: "SET_SUCCESS", payload: message })
            }
          />
        )}
        {selectedForm === "CheckHoursForm" && <CheckHoursForm />}
        {selectedForm === "SpecialWorkForm" && (
          <SpecialWorkForm onSubmit={handleSubmit} />
        )}
      </main>
    </Layout>
  );
};

export default CheckVolunteerHoursForm;
