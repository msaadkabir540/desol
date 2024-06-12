"use client";

import Image from "next/image";
import React, { useState } from "react";

import { useForm } from "react-hook-form";

const AddVehicle = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [numPictures, setNumPictures] = useState(1);
  const [uploadedPictures, setUploadedPictures] = useState([]);

  const onSubmit = async (data) => {
    try {
      const imageUrls = await uploadImages(uploadedPictures);

      const formData = {
        modal: data.modal,
        price: data.price,
        phone: data.phone,
        city: data.city,
        imageUrls: imageUrls,
      };

      const res = await fetch("../api/vehicle", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to add vehicle");
      }

      const { message } = await res.json();
      alert("Added Successfully");
      reset();
    } catch (error) {
      console.log("Failed to add vehicle", error);
      alert("Failed to add vehicle");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array?.from(e.target.files);

    const selectedImages = files?.slice(0, numPictures);

    const newUploadedPictures = selectedImages?.map((file) => ({
      file: file,
      previewURL: URL?.createObjectURL(file),
    }));
    setUploadedPictures(newUploadedPictures);
  };

  const uploadImages = async (images) => {
    const uploadedUrls = await Promise.all(
      images.map(async (image) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const imageUrl = `${image.file.name}`;
            resolve(imageUrl);
          }, 1000);
        });
      })
    );

    return uploadedUrls;
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 overflow-hidden">
      <div className="col-12 col-md-6">
        <h4 className="mb-2 text-center">Add New Vehicle</h4>
        <div className="mb-2">
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="mb-3">
              <label htmlFor="modal" className="form-label">
                Modal
              </label>
              <input
                id="modal"
                className="form-control"
                {...register("modal", { required: "Car Model is required" })}
              />
              {errors.modal && <p className="text-danger">{errors.modal.message}</p>}
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                id="price"
                type="text"
                className="form-control"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && <p className="text-danger">{errors.price.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="form-control"
                {...register("phone", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 11,
                    message: "Phone Number must be exactly 11 digits",
                  },
                  maxLength: {
                    value: 11,
                    message: "Phone Number must be exactly 11 digits",
                  },
                })}
              />
              {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <div className="form-check">
                <input
                  id="lahore"
                  type="radio"
                  value="Lahore"
                  className="form-check-input"
                  {...register("city", { required: "City is required" })}
                />
                <label htmlFor="lahore" className="form-check-label">
                  Lahore
                </label>
              </div>
              <div className="form-check">
                <input
                  id="karachi"
                  type="radio"
                  value="Karachi"
                  className="form-check-input"
                  {...register("city", { required: "City is required" })}
                />
                <label htmlFor="karachi" className="form-check-label">
                  Karachi
                </label>
              </div>
              {errors.city && <p className="text-danger">{errors.city.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="numPictures" className="form-label">
                Number of Pictures to Upload (1-10)
              </label>
              <select
                id="numPictures"
                className="form-control"
                {...register("numPictures", {
                  required: "Number of Pictures is required",
                })}
                onChange={(e) => setNumPictures(parseInt(e.target.value))}
              >
                {[...Array(10)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              {errors.numPictures && <p className="text-danger">{errors.numPictures.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="pictures" className="form-label">
                Upload Pictures
              </label>
              <input
                id="pictures"
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              <div className="mb-3 mt-3">
                {uploadedPictures?.map((image, index) => (
                  <Image
                    height="100"
                    width="100"
                    style={{
                      margin: "5px",
                      width: "100px",
                      maxWidth: "150px",
                      maxHeight: "150px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    key={index}
                    src={image.previewURL}
                    alt={`Image ${index + 1}`}
                    className="img-thumbnail mx-2"
                  />
                ))}
              </div>
            </div>
            <div className="mb-3 text-end">
              <input type="submit" className="btn btn-primary w-100" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVehicle;
