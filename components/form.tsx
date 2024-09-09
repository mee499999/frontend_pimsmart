"use client";

import React, { useState } from 'react';
import { postVolunteerActivity } from '../app/api/test';
import { VolunteerActivity } from '@/types/IResponse';
import Navbar from '@/components/Navbar';

const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    student_id: '',
    full_name: '',
    activity_name: '',
    organization_name: '',
    organization_phone: '',
    activity_description: '',
    activity_date: '',
    hours: '',
    activity_image: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await postVolunteerActivity({
        student_id: formData.student_id,
        full_name: formData.full_name,
        activity_name: formData.activity_name,
        organization_name: formData.organization_name,
        organization_phone: formData.organization_phone,
        activity_description: formData.activity_description,
        activity_date: formData.activity_date,
        hours: parseInt(formData.hours, 10), // Convert hours to a number
        activity_image: formData.activity_image
      });
      setFormData({
        student_id: '',
        full_name: '',
        activity_name: '',
        organization_name: '',
        organization_phone: '',
        activity_description: '',
        activity_date: '',
        hours: '',
        activity_image: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Failed to submit volunteer activity. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Submit Volunteer Activity</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="student_id">Student ID:</label>
          <input
            type="text"
            id="student_id"
            name="student_id"
            value={formData.student_id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="full_name">Full Name:</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="activity_name">Activity Name:</label>
          <input
            type="text"
            id="activity_name"
            name="activity_name"
            value={formData.activity_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="organization_name">Organization Name:</label>
          <input
            type="text"
            id="organization_name"
            name="organization_name"
            value={formData.organization_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="organization_phone">Organization Phone:</label>
          <input
            type="text"
            id="organization_phone"
            name="organization_phone"
            value={formData.organization_phone}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="activity_description">Activity Description:</label>
          <textarea
            id="activity_description"
            name="activity_description"
            value={formData.activity_description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="activity_date">Activity Date:</label>
          <input
            type="date"
            id="activity_date"
            name="activity_date"
            value={formData.activity_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={formData.hours}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="activity_image">Activity Image URL:</label>
          <input
            type="text"
            id="activity_image"
            name="activity_image"
            value={formData.activity_image}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Page;
